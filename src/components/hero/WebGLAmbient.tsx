"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL ambient background for the hero section.
 * Subtle FBM noise with faint colour pools and cursor-reactive drift.
 * DPR capped at 1.5 for performance; runs a single rAF loop.
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
  uniform vec2  u_mouse;
  uniform float u_scroll;

  /* ---- simplex helpers ---- */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
      -0.577350269189626,
      0.024390243902439
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

    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x  = a0.x * x0.x  + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
  }

  /* ---- fbm (4 octaves — lighter than the preloader) ---- */
  float fbm(vec2 p) {
    float value     = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p);
      p      = p * 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 p  = uv * 2.5;
    float t = u_time * 0.08;

    /* mouse influence — slow, low amplitude */
    vec2 mOff = (u_mouse - 0.5) * 0.15;

    float n1 = fbm(p + vec2( t * 0.4,  t * 0.3) + mOff);
    float n2 = fbm(p * 1.3 + vec2(-t * 0.25, t * 0.35) - mOff * 0.5);
    float n3 = fbm(p * 0.7 + vec2( t * 0.15, -t * 0.2) + n1 * 0.3);

    float warp = fbm(p + vec2(n1, n2) * 0.4 + t * 0.1);

    vec3 bg = vec3(0.039, 0.039, 0.039);
    vec3 c1 = vec3(0.05, 0.08, 0.02);
    vec3 c2 = vec3(0.02, 0.04, 0.08);
    vec3 c3 = vec3(0.06, 0.03, 0.05);

    vec3 color = bg;
    color += c1 * smoothstep(-0.1, 0.5, n1) * 0.35;
    color += c2 * smoothstep(-0.1, 0.5, n2) * 0.25;
    color += c3 * smoothstep(-0.2, 0.4, warp) * 0.2;

    /* faint accent on peaks */
    color += vec3(0.784, 1.0, 0.0) * smoothstep(0.4, 0.6, n1 + n2 * 0.3) * 0.015;

    /* vignette */
    float vig = 1.0 - length((uv - 0.5) * 1.6);
    vig = smoothstep(-0.1, 0.6, vig);
    color *= vig * 0.7 + 0.3;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WebGLAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
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

    /* fullscreen quad */
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

    /* uniforms */
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes  = gl.getUniformLocation(program, "u_resolution");
    const uMous = gl.getUniformLocation(program, "u_mouse");
    const uScrl = gl.getUniformLocation(program, "u_scroll");

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas!.width  = window.innerWidth  * dpr;
      canvas!.height = window.innerHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const t0  = performance.now();
    let raf = 0;

    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMous, mouseRef.current.x, mouseRef.current.y);
      gl!.uniform1f(uScrl, 0.0);
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
      style={{ opacity: 0.8 }}
    />
  );
}
