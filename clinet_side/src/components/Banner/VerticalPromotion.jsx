import React, { useEffect, useState } from "react";
import VerticalSlider from "./VerticalSlider";
import { usePromotion } from "../../api/hooks/usePromotion";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import slidePlaceholder from "../../assets/images/banner-1.png";

const VerticalPromotions = ({ autoplaySpeed = 4000 }) => {
  const navigate = useNavigate();
  const { getPromotions } = usePromotion();
  const { data: promotions, isLoading } = getPromotions;
  const [bannerData, setBannerData] = useState([]);

  console.log(promotions);
  useEffect(() => {
    if (promotions && promotions.length > 0) {
      setBannerData(
        promotions.map((promo) => ({
          imageUrl: promo.bannerImageUrl,
          title: promo.name,
          promotionId: promo._id,
          products: promo.products,
        }))
      );
    } else {
      setBannerData([
        { imageUrl: slidePlaceholder, title: "Promo 1", products: [] },
        { imageUrl: slidePlaceholder, title: "Promo 2", products: [] },
        { imageUrl: slidePlaceholder, title: "Promo 3", products: [] },
      ]);
    }
  }, [promotions]);

  const handleClick = (item) => {
    navigate("/products", {
      state: {
        products: item.products,
        promotionId: item.promotionId,
        category: item.title,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <VerticalSlider autoplaySpeed={autoplaySpeed}>
      {bannerData.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer h-full w-full overflow-hidden"
          onClick={() => handleClick(item)}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </VerticalSlider>
  );
};

export default VerticalPromotions;
