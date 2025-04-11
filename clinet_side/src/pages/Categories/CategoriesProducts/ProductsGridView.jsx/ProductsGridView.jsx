import React from "react";
import ProductCard from "../../../../components/ProductCard/ProductCard";

function ProductsGridView({ products, sectionId }) {
  console.log("products gridView", products);

  const validProducts = (products || []).filter(
    (product) => Object.keys(product).length > 0
  );

  if (validProducts.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="row mt-6 ">
      {validProducts.map((product, index) => (
        <ProductCard product={product} sectionId={sectionId} key={index} />
      ))}
    </div>
  );
}

export default ProductsGridView;
