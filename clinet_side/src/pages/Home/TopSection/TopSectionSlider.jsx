import React, { useEffect, useRef, useState } from "react";
import slide1 from "../../../assets/images/slide-1.png";
import { useNavigate } from "react-router-dom";
import { isTabView } from "../../../utils/helper";
import { usePromotion } from "../../../api/hooks/usePromotion";
import Spinner from "@/components/Spinner";

const CustomSlider = ({ children, autoplaySpeed = 2000 }) => {
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
      className="custom-slider"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      ref={slideRef}
    >
      <div
        className="slider-container"
        style={{
          width: `${100 * childrenArray.length}%`,
          transform: `translateX(-${
            (currentSlide * 100) / childrenArray.length
          }%)`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 ${100 / childrenArray.length}%`,
              width: "100%",
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {childrenArray.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const TopSectionSlider = () => {
  const navigate = useNavigate();
  const { getPromotions } = usePromotion();
  const { data: promotions, isLoading: isLoadingPromotions } = getPromotions;
  console.log("promotions", promotions);
  const [bannerData, setBannerData] = useState([]);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const mouseMoved = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobileScreen(mediaQuery.matches);
    const handleResize = () => setIsMobileScreen(mediaQuery.matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (promotions && promotions.length > 0) {
      const mappedData = promotions.map((promo) => ({
        banner_images: promo.imageUrl ? promo.imageUrl : slide1,
        title: promo.name,
        promotionId: promo._id,
        banner_url: "/products",
        products: promo.products,
      }));

      setBannerData(mappedData);
    } else {
      setBannerData([
        {
          banner_images: slide1,
          title: "Smart Shoes",
          banner_url: "/products",
          products: [],
        },
        {
          banner_images: slide1,
          title: "Smart Watches",
          banner_url: "/products",
          products: [],
        },
        {
          banner_images: slide1,
          title: "New Collection",
          banner_url: "/products",
          products: [],
        },
      ]);
    }
  }, [promotions]);

  const handleDotClick = (index) => {};

  const handleClick = (item) => {
    console.log("item clicked", item);
    navigate(item.banner_url, {
      state: {
        products: item.products,
        promotionId: item.promotionId,
        category: item.title,
      },
    });
  };

  if (isLoadingPromotions) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (bannerData?.length < 1) {
    return null;
  }

  return (
    <>
      {isMobileScreen || isTabView() ? (
        <div className="col-xl-7 col-lg-7 col-md-12">
          <CustomSlider>
            {bannerData.map((item, index) => (
              <div
                className="slide-sec"
                key={index}
                style={{ borderRadius: "10px" }}
                onMouseMove={() => {
                  if (!mouseMoved.current) {
                    mouseMoved.current = true;
                  }
                }}
                onMouseDown={() => (mouseMoved.current = false)}
                onMouseUp={() => handleClick(item)}
              >
                <img
                  src={item.banner_images}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  alt={item.title}
                />
              </div>
            ))}
          </CustomSlider>
        </div>
      ) : (
        <div className="col-xl-12 col-lg-12 col-md-12">
          <CustomSlider>
            {bannerData.map((item, index) => (
              <div
                className="slide-sec"
                key={index}
                style={{ borderRadius: "20px" }}
                onMouseMove={() => {
                  if (!mouseMoved.current) {
                    mouseMoved.current = true;
                  }
                }}
                onMouseDown={() => (mouseMoved.current = false)}
                onMouseUp={() => handleClick(item)}
              >
                <img
                  src={item.banner_images}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                  alt={item.title}
                />
              </div>
            ))}
          </CustomSlider>
        </div>
      )}
    </>
  );
};

export default TopSectionSlider;
