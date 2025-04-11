import React, { useEffect, useRef, useState } from "react";

const VerticalSlider = ({ children, autoplaySpeed = 2000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const slideRef = useRef(null);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoplay) {
        setCurrentSlide((prev) => (prev + 1) % childrenArray.length);
      }
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [childrenArray.length, isAutoplay, autoplaySpeed]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  return (
    <div
      className="relative h-full overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      ref={slideRef}
    >
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{
          height: `${100 * childrenArray.length}%`,
          transform: `translateY(-${
            (currentSlide * 100) / childrenArray.length
          }%)`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            style={{
              height: `${100 / childrenArray.length}%`,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2">
        {childrenArray.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalSlider;
