import React, { useEffect } from "react";
import ProductView from "./ProductView/ProductView";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useLocation, useParams } from "react-router-dom";
// import { useProducts } from "src/api/hooks/useProducts";
import { useGetProductById } from "../../api/queries/useProducts";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const { id: productId } = useParams();
  const { sectionId, promoProduct } = location.state || {};
  console.log("sectionId product Details", sectionId);
  console.log("product details promo", location.state);
  const {
    data: fetchedProduct,
    isLoading,
    isError,
  } = useGetProductById(productId, {
    enabled: !promoProduct,
  });
  console.log("fetchedProduct", fetchedProduct);

  const product = promoProduct || fetchedProduct;
  // const finalSectionId = product.sectionId || sectionId;

  return (
    <>
      <ProductView
        key={promoProduct?.productId || sectionId || productId}
        product={product}
      />
      <RelatedProducts
        key={sectionId}
        sectionId={promoProduct?.sectionId || sectionId || product?.sectionId}
      />
    </>
  );
};

export default ProductDetails;
