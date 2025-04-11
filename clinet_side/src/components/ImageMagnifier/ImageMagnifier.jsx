import React, { useState } from "react";
import dummmyImage from "../../assets/images/no-image1.png";
import { isTabView } from "../../utils/Helper";



export function ImageMagnifier({
  src,
  containerWidth,
  magnifierHeight = 200,
  magnifieWidth = 200,
  zoomLevel = 2,
  onError,
  onMouseEnter,
  onMouseLeave,
  isMobileScreen,
  onImageClick,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        width: containerWidth,
        height: isMobileScreen ? "200px" : isTabView() ? "340px" : "340px",
        display: "flex",
      }}
      className="img-slider"
    >
      <img
        className="imgMagnifier"
        onError={handleImageError}
        src={src || dummmyImage}
        onMouseEnter={(e) => {
          if (!isMobileScreen && !isTabView()) {
            // Update image size and turn on magnifier
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }
        }}
        onMouseMove={(e) => {
          if (!isMobileScreen && !isTabView()) {
            // Update cursor position
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }
        }}
        onMouseLeave={() => {
          if (!isMobileScreen && !isTabView()) {
            // Close magnifier
            setShowMagnifier(false);
          }
        }}
        alt={"img"}
        onClick={onImageClick}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
