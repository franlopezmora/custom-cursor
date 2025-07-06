import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;

    const animate = () => {
      currentX.current += (mouseX.current - currentX.current) * 0.15;
      currentY.current += (mouseY.current - currentY.current) * 0.15;

      cursor.style.transform = `translate(${currentX.current}px, ${currentY.current}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.dataset.hover === "true" ||
        target.classList.contains("hover-target")
      ) {
        setHovering(true);
      }
    };

    const handleMouseOut = () => setHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovering ? "40px" : "30px",
        height: hovering ? "40px" : "30px",
        borderRadius: "9999px",
        pointerEvents: "none",
        zIndex: 9999,
        backgroundColor: "#fff",
        mixBlendMode: "difference",
        transition: "width 0.3s ease, height 0.3s ease",
      }}
    />
  );
}
