import React, { useState, useEffect } from "react";
import { ImageMagnifier } from "../../../components/ImageMagnifier/ImageMagnifier";
import leftArrow from "../../../assets/images/arrow-left.png";
import rightArrow from "../../../assets/images/arrow-right.png";
import demoImage from "../../../assets/images/demoimage.png";
import dummyImage from "../../../assets/images/no-image1.png";
import { Modal } from "react-bootstrap";
import { isTabView } from "../../../utils/Helper";

const ProductDetailsImages = ({ images, isMobileScreen }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    if (autoplay && images.length > 1) {
      const interval = setInterval(() => {
        handleArrowClick("right");
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeImageIndex, autoplay, images.length]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = dummyImage;
  };

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setActiveImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
      setStartIndex((prev) =>
        prev === 0 ? Math.max(0, images.length - 4) : prev - 1
      );
    } else {
      setActiveImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
      setStartIndex((prev) => (prev + 4 >= images.length ? 0 : prev + 1));
    }
  };

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderThumbnails = () => {
    if (images.length <= 1) return null;

    const thumbnailsToShow = images.slice(startIndex, startIndex + 4);

    return (
      <div
        className={`thumbnail-carousel ${images.length < 3 ? "centered" : ""}`}
        // style={{
        //   marginLeft:
        //     images?.length < 3
        //       ? isMobileScreen
        //         ? "180px"
        //         : isTabView()
        //         ? "140px"
        //         : "270px"
        //       : "0px", // Or set the default value if images.length >= 4
        // }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.length > 3 && (
          <button
            className="carousel-arrow left-arrow"
            onClick={() => handleArrowClick("left")}
          >
            <img src={leftArrow} alt="Previous" />
          </button>
        )}
        <div className="carousel-thumbnails justify-content-center">
          {thumbnailsToShow.map((item, index) => (
            <div
              key={startIndex + index}
              className={`thumbnail-slide ${
                activeImageIndex === startIndex + index ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(startIndex + index)}
            >
              <img
                src={item.image_path || dummyImage}
                onError={handleImageError}
                alt={`Thumbnail ${startIndex + index}`}
              />
            </div>
          ))}
        </div>
        {images.length > 3 && (
          <button
            className="carousel-arrow right-arrow"
            onClick={() => handleArrowClick("right")}
          >
            <img src={rightArrow} alt="Next" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="col-xl-5 col-lg-5 col-md-5">
      {images?.length > 0 ? (
        <div className="product-images-container">
          <ImageMagnifier
            src={images[activeImageIndex]?.image_path || images[0].image_path}
            isMobileScreen={isMobileScreen}
            containerWidth={"100%"}
            onImageClick={() => {
              if (isMobileScreen || isTabView()) {
                openModal();
              }
            }}
          />
          {renderThumbnails()}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <img
            src={demoImage}
            style={{ width: "350px", height: "250px" }}
            alt="Demo"
          />
        </div>
      )}

      {/* Modal */}
      <Modal
        show={isModalOpen}
        onHide={closeModal}
        centered
        dialogClassName="custom-modal"
        keyboard={false}
      >
        <Modal.Body className="modal-body">
          <button
            className="modal-close-btn"
            onClick={closeModal}
            style={{ color: "#000" }}
          >
            &times;
          </button>
          <div className="modal-slider">
            {images?.length > 0 && (
              <img
                src={images[activeImageIndex]?.image_path || dummyImage}
                alt={`Modal Image ${activeImageIndex}`}
                onError={handleImageError}
                className="modal-image"
                style={{
                  height: isTabView() ? "620px" : "320px",
                  padding: "10px",
                }}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetailsImages;
