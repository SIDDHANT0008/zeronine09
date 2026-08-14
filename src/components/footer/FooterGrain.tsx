"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive WebGL noise for the footer.
 * Accent glow follows the pointer; film grain and faint scan lines add texture.
 * Uses alpha blending so it layers over the footer background.
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

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    /* mouse-reactive accent glow */
    float dist = length(uv - u_mouse);
    float glow = smoothstep(0.4, 0.0, dist) * 0.15;

    vec3 accent = vec3(0.784, 1.0, 0.0);   // #C8FF00
    vec3 color  = accent * glow;

    /* film grain */
    float grain = hash(uv * u_resolution + fract(u_time) * 100.0) * 0.06;
    color += grain;

    /* faint scan lines */
    color += sin(uv.y * u_resolution.y * 0.5) * 0.005;

    gl_FragColor = vec4(color, glow * 0.6);
  }
`;

export default function FooterGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
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
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes  = gl.getUniformLocation(program, "u_resolution");
    const uMous = gl.getUniformLocation(program, "u_mouse");

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio, 1.5);
      canvas!.width  = rect.width  * dpr;
      canvas!.height = rect.height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: MouseEvent) => {
      const rect = parent!.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    parent.addEventListener("mousemove", onMove);

    const t0  = performance.now();
    let raf = 0;

    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMous, mouseRef.current.x, mouseRef.current.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vert!);
      gl.deleteShader(frag!);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
