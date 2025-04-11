import { useRef, useEffect } from "react";
import gsap from "gsap";

function MagneticButton({ children, onClick, className }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const button = btnRef.current;
    const strength = 25;

    const handleMouseMove = (event) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = event.clientX - (left + width / 2);
      const y = event.clientY - (top + height / 2);

      gsap.to(button, {
        x: x / strength,
        y: y / strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={`relative px-6 py-3 text-white bg-blue-600 font-semibold rounded-md 
      hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MagneticButton;
