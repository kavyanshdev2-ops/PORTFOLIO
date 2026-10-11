import React, { useEffect, useRef, useState } from "react";

interface HeroArtifactCanvasProps {
  className?: string;
}

export const HeroArtifactCanvas: React.FC<HeroArtifactCanvasProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rotation = useRef({ x: 0.3, y: 0.4, vx: 0.003, vy: 0.004 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // 3D Icosahedron vertices definition
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len];
    });

    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number) => {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return [x1, y2, z2];
    };

    let time = 0;

    const render = () => {
      time += 0.01;
      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      rotation.current.y += rotation.current.vy + mousePos.current.x * 0.0005;
      rotation.current.x += rotation.current.vx + mousePos.current.y * 0.0004;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Draw subtle orbital rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.45, rotation.current.y * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(124, 157, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.5, radius * 0.55, -rotation.current.x * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(167, 139, 250, 0.08)";
      ctx.setLineDash([2, 12]);
      ctx.stroke();
      ctx.restore();

      // Transform vertices
      const transformed = baseVertices.map(([vx, vy, vz]) => {
        const [rx, ry, rz] = rotatePoint(
          vx,
          vy,
          vz,
          rotation.current.x + mousePos.current.y * 0.3,
          rotation.current.y + mousePos.current.x * 0.3
        );
        // Perspective projection
        const fov = 4;
        const scale = fov / (fov + rz);
        return {
          x: cx + rx * radius * scale,
          y: cy + ry * radius * scale,
          z: rz,
          scale,
        };
      });

      // Calculate face normals and depths for z-sorting
      const sortedFaces = faces.map((indices) => {
        const v0 = transformed[indices[0]];
        const v1 = transformed[indices[1]];
        const v2 = transformed[indices[2]];
        const avgZ = (v0.z + v1.z + v2.z) / 3;

        // Normal computation
        const ax = v1.x - v0.x;
        const ay = v1.y - v0.y;
        const bx = v2.x - v0.x;
        const by = v2.y - v0.y;
        const cross = ax * by - ay * bx;

        return { indices, avgZ, isFront: cross > 0 };
      }).sort((a, b) => a.avgZ - b.avgZ);

      // Render glass faces
      sortedFaces.forEach(({ indices, avgZ, isFront }) => {
        const [i0, i1, i2] = indices;
        const p0 = transformed[i0];
        const p1 = transformed[i1];
        const p2 = transformed[i2];

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();

        // Shading based on depth and angle
        const depthNorm = (avgZ + 1) / 2; // 0 to 1
        const alpha = isFront ? 0.08 + depthNorm * 0.12 : 0.02 + depthNorm * 0.04;

        // Glass gradient fill
        const grad = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
        if (isFront) {
          grad.addColorStop(0, `rgba(124, 157, 255, ${alpha * 1.5})`);
          grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.8})`);
          grad.addColorStop(1, `rgba(167, 139, 250, ${alpha * 1.8})`);
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          grad.addColorStop(1, `rgba(124, 157, 255, ${alpha * 0.5})`);
        }
        ctx.fillStyle = grad;
        ctx.fill();

        // Facet wireframe edges
        ctx.strokeStyle = isFront
          ? `rgba(255, 255, 255, ${0.15 + depthNorm * 0.25})`
          : `rgba(124, 157, 255, ${0.05 + depthNorm * 0.08})`;
        ctx.lineWidth = isFront ? 1.2 : 0.6;
        ctx.stroke();
      });

      // Specular vertex nodes
      transformed.forEach((p) => {
        if (p.z > -0.2) {
          const nodeAlpha = Math.max(0.1, (p.z + 1) / 2);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha * 0.9})`;
          ctx.fill();

          // Node glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 157, 255, ${nodeAlpha * 0.3})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mousePos.current.targetX = Math.max(-1, Math.min(1, nx));
      mousePos.current.targetY = Math.max(-1, Math.min(1, ny));
    };

    const handlePointerLeave = () => {
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
      setIsHovered(false);
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handlePointerMove);
      container.addEventListener("mouseenter", handlePointerEnter);
      container.addEventListener("mouseleave", handlePointerLeave);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mousemove", handlePointerMove);
        container.removeEventListener("mouseenter", handlePointerEnter);
        container.removeEventListener("mouseleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none group ${className}`}
    >
      {/* Ambient optical backglow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7C9DFF]/15 via-transparent to-[#A78BFA]/15 blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60" />

      {/* Behind Canvas: high-resolution rendered glass artifact backdrop for optical depth */}
      <div className="absolute inset-6 rounded-2xl overflow-hidden pointer-events-none opacity-20 dark:opacity-30 mix-blend-screen scale-95 transition-transform duration-500 group-hover:scale-100">
        <img
          src="/src/assets/images/hero_glass_artifact_1791731066744.jpg"
          alt="Translucent glass artifact"
          className="w-full h-full object-contain filter contrast-125"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dynamic 3D interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating subtle glass interface ring indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#9698A3] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7C9DFF] animate-pulse" />
        <span>3D Glass Geometry · Drag / Move cursor</span>
      </div>
    </div>
  );
};
