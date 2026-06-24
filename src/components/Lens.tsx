import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.8,
  lensSize = 140,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to the bounding container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement lag and physical feedback
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  // Map the smooth lens positions to the zoomed content translation inside the lens
  // Mathematically: tx = -X_center * zoomFactor + lensSize / 2
  // X_center is lensX + lensSize / 2
  const zoomX = useTransform(
    lensX,
    (val) => -(val + lensSize / 2) * zoomFactor + lensSize / 2
  );
  const zoomY = useTransform(
    lensY,
    (val) => -(val + lensSize / 2) * zoomFactor + lensSize / 2
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Center the lens directly at the mouse cursor
    mouseX.set(x - lensSize / 2);
    mouseY.set(y - lensSize / 2);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden cursor-crosshair w-full h-full rounded-md"
    >
      {/* Normal/Standard Content */}
      <div className="w-full h-full select-none">
        {children}
      </div>

      {/* Lens Magnifier Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            style={{
              position: 'absolute',
              left: lensX,
              top: lensY,
              width: lensSize,
              height: lensSize,
            }}
            className="rounded-full pointer-events-none border border-gold shadow-[0_0_20px_rgba(212,175,55,0.45)] overflow-hidden bg-midnight z-30"
          >
            {/* Replicated zoomed-in content shift */}
            <motion.div
              style={{
                x: zoomX,
                y: zoomY,
                width: containerRef.current?.clientWidth || '100%',
                height: containerRef.current?.clientHeight || '100%',
                transformOrigin: 'top left',
                scale: zoomFactor,
              }}
              className="absolute top-0 left-0 pointer-events-none select-none"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
