import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useAnimation } from "framer-motion";

const FlyToCartAnimation = ({ image, start, end, onComplete }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls
      .start({
        x: end.x - start.x,
        y: end.y - start.y,
        scale: 0.1,
        opacity: 0.5,
        transition: { duration: 0.8, ease: "easeInOut" },
      })
      .then(onComplete);
  }, [controls, start, end, onComplete]);

  return createPortal(
    <motion.img
      src={image}
      initial={{
        position: "absolute",
        top: start.y,
        left: start.x,
        width: 100,
        height: 100,
        zIndex: 1000,
      }}
      animate={controls}
      style={{ borderRadius: "10px", pointerEvents: "none" }}
    />,
    document.body
  );
};

export default FlyToCartAnimation;
