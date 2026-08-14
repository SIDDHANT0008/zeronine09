"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL gradient-mesh preloader background.
 * Layered FBM noise with dark accent pools and subtle #C8FF00 highlights.
 * All heavy lifting lives in the fragment shader; the JS side only
 * manages the canvas, uniforms, and a single requestAnimationFrame loop.
 */

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_progress;
  uniform vec2  u_mouse;

  /* ---- simplex helpers ---- */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,   // (3-sqrt(3))/6
      0.366025403784439,   // 0.5*(sqrt(3)-1)
      -0.577350269189626,  // -1 + 2*C.x
      0.024390243902439    // 1/41
    );

    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);
    vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0)
    );

    vec3 m = max(0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ), 0.0);

    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x  = a0.x * x0.x  + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
  }

  /* ---- fractal brownian motion (5 octaves) ---- */
  float fbm(vec2 p) {
    float value     = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value     += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  /* ---- main ---- */
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 p  = uv * 3.0;
    float t = u_time * 0.15;

    /* layered noise */
    float n1 = fbm(p + vec2( t * 0.3,  t * 0.2));
    float n2 = fbm(p * 1.5 + vec2(-t * 0.2, t * 0.4) + n1 * 0.5);
    float n3 = fbm(p * 0.8 + vec2( t * 0.1, -t * 0.15) + n2 * 0.3);

    /* dark base + accent pools */
    vec3 bg      = vec3(0.039, 0.039, 0.039);   // #0A0A0A
    vec3 accent1 = vec3(0.08,  0.12,  0.02);     // dark green-gold
    vec3 accent2 = vec3(0.02,  0.06,  0.12);     // deep blue
    vec3 accent3 = vec3(0.10,  0.04,  0.08);     // deep plum

    float m1 = smoothstep(-0.3, 0.5, n1);
    float m2 = smoothstep(-0.2, 0.6, n2);
    float m3 = smoothstep(-0.4, 0.4, n3);

    vec3 color = bg;
    color = mix(color, accent1, m1 * 0.6);
    color = mix(color, accent2, m2 * 0.4);
    color = mix(color, accent3, m3 * 0.3);

    /* faint #C8FF00 highlight on peaks */
    float highlight = smoothstep(0.35, 0.5, n1 + n2 * 0.5);
    color = mix(color, vec3(0.784, 1.0, 0.0), highlight * 0.04);

    /* vignette */
    float vignette = 1.0 - length((uv - 0.5) * 1.4);
    vignette = smoothstep(0.0, 0.7, vignette);
    color *= vignette * 0.8 + 0.2;

    /* exit fade */
    float edgeFade = smoothstep(0.0, 0.3, u_progress)
                   * smoothstep(1.0, 0.7, u_progress);
    color *= edgeFade;

    /* film grain */
    float grain = (fract(sin(dot(gl_FragCoord.xy,
      vec2(12.9898, 78.233) + u_time)) * 43758.5453) - 0.5) * 0.03;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WebGLLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    /* ---- helpers ---- */
    function compile(type: number, source: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, source);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vert = compile(gl.VERTEX_SHADER, VERT);
    const frag = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    /* ---- fullscreen quad ---- */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    /* ---- uniforms ---- */
    const uTime       = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uProgress   = gl.getUniformLocation(program, "u_progress");
    const uMouse      = gl.getUniformLocation(program, "u_mouse");

    let mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width  = window.innerWidth  * dpr;
      canvas!.height = window.innerHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---- loop ---- */
    const t0 = performance.now();
    let raf = 0;

    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uProgress, Math.min(elapsed / 2.0, 1.0));
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
