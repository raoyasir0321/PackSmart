import React from "react";
import Slider from "react-slick";
import b1 from "../../../assets/images/banner-1.png";
import b2 from "../../../assets/images/banner-2.png";

// Don't forget to import the required CSS files in your main component:
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const TopBrandSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: function(i) {
      return (
        <div
          style={{
            width: '18px',
            height: '6px',
            borderRadius:"100px",
            background: 'rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            marginTop:"12px"
          }}
        />
      );
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const banners = [
    {
      image: b1,
      title: "Free Delivery To Your Door",
      subtitle:
        "Collect a basket worth more than £30 and get free delivery to your door.",
    },
    {
      image: b2,
      title: "Save Up to 25% With Promo Code",
      subtitle: "*Not combined with promotional offers and discounts",
      promoCode: "WOODVEG25",
    },
  ];

  return (
    <div className="slider-container-brand">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="banner-slide-brand">
            <img
              src={banner.image}
              alt={banner.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                padding: "0 10px",
              }}
            />
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .slider-container-brand {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0px 0;
        }

        .banner-slide-brand {
          outline: none;
        }

        /* Override slick-slider default styles */
        :global(.slick-dots) {
          bottom: -30px;
        }

        :global(.slick-dots li button:before) {
          font-size: 12px;
          color: #666;
        }

        :global(.slick-dots li.slick-active button:before) {
          color: #333;
        }

        :global(.slick-prev),
        :global(.slick-next) {
          z-index: 1;
        }

        :global(.slick-prev) {
          left: 10px;
        }

        :global(.slick-next) {
          right: 10px;
        }

        :global(.slick-prev:before),
        :global(.slick-next:before) {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default TopBrandSlider;
