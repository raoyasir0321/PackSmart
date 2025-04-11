import React from "react";
import { FaUserCircle } from "react-icons/fa";
import StarRating from "../../../components/StarRating/StarRating";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { isTabView } from "../../../utils/Helper";

function ReviewItem({
  reviewerName,
  date,
  reviewContent,
  images,
  starRating,
  isMobileScreen,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => setSelectedImage(!selectedImage);

  return (
    <div className="review-body">
      <div className="client-review-img mb-2 mx-1 styled">
        {images &&
          images?.map((productImage, index) => (
            <img
              key={index}
              src={productImage ? productImage : null}
              style={{
                width: isMobileScreen ? "95px" : "150px",
                height: isMobileScreen ? "65px" : "100px",
                marginRight: "15px",
                objectFit: "fill",
                cursor: "pointer",
              }}
              onClick={() => openImage(productImage)}
            />
          ))}
      </div>
      {selectedImage && (
        <>
          <Modal show={selectedImage} onHide={handleClose} centered>
            <Modal.Body>
              <div className="d-flex justify-content-end">
                <button className="btn btn-light" onClick={handleClose}>
                  <ImCross size={15} color="#219ebc" />
                </button>
              </div>
              <div
                className="justify-content-center d-flex w-100 mt-3"
                style={{ borderRadius: "20px" }}
              >
                <img
                  src={selectedImage}
                  style={{
                    height: isMobileScreen
                      ? "180px"
                      : isTabView()
                      ? "230px"
                      : "330px",
                    width: "100%",
                    borderRadius: "15px",
                  }}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
      <div className="review-sec">
        <FaUserCircle
          className={`${isMobileScreen ? "me-1 mt-1" : "me-3"}`}
          style={{
            width: isMobileScreen ? "40px" : "50px",
            height: isMobileScreen ? "30px" : "40px",
          }}
        />
        <div className="review-left">
          <div className="d-flex ">
            <div className="review-header">
              <div>
                <span className="name">{reviewerName}</span>
                <span>{date}</span>
              </div>
            </div>
            <div className="star">
              <StarRating rating={starRating} isMobileScreen={isMobileScreen} />
            </div>
          </div>
          <div className="review-content">
            <p className="mt-2">{reviewContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
