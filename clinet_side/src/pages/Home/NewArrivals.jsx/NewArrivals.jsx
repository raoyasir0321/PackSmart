// import React from "react";
// import { Link } from "react-router-dom";
// import { useProducts } from "../../../api/hooks/useProducts";
// import currencies from "@/utils/currencies";
// import icon1 from "../../../assets/images/icon-1.png";
// import cartIcon from "../../../assets/images/cart.png";
// import heartTheme from "../../../assets/images/heart-theme.png";
// import heartFilled from "../../../assets/images/active-heart.png";
// import useAddToCart from "../../../api/hooks/useAddToCart";
// import { useCreateWish } from "../../../../src/api/mutations/useCreateWish";
// import { useGetWishList } from "../../../../src/api/queries/useWishList";
// import toast from "react-hot-toast";

// function NewArrivals({ title }) {
//   const { getNewArrivalProducts } = useProducts();
//   const { data: newArrivals, isPending: isLoadingArrivals } =
//     getNewArrivalProducts;

//   const handleAddToCart = useAddToCart();
//   const createWish = useCreateWish();
//   const { data: wishList } = useGetWishList();

//   // Check if product is in the wishlist
//   const isProductWished = (productId) => {
//     if (!wishList || wishList.length === 0) return false;
//     return wishList.some((wishItem) =>
//       wishItem.product.some((p) => p._id === productId)
//     );
//   };

//   // Toggle wishlist (add/remove)
//   const handleAddToWishlist = (e, productId) => {
//     e.preventDefault();
//     const alreadyWished = isProductWished(productId);
//     const payload = alreadyWished
//       ? { remove: [productId] }
//       : { productId: [productId] };

//     createWish.mutate(payload, {
//       onSuccess: (res) => {
//         if (res.productId.includes(productId)) {
//           toast.success("Product added to wishlist");
//         } else {
//           toast.error("Product removed from wishlist");
//         }
//       },
//       onError: () => {
//         toast.error("Failed to modify wishlist");
//       },
//     });
//   };

//   return (
//     <section className="new-arrivals">
//       <div className="container">
//         {/* Heading Row */}
//         <div className="row align-items-center">
//           <div className="col-xl-6 col-lg-6 col-md-6 col-8">
//             <div className="left">
//               <div className="d-flex align-items-center">
//                 <img src={icon1} alt="New Arrivals Icon" />
//                 <h2 className="fw-bold ms-n2">{title}</h2>
//               </div>
//             </div>
//           </div>
//           <div className="col-6 text-end">
//             <Link to="#">
//               View All <i className="fa fa-angle-right ms-2" />
//             </Link>
//           </div>
//         </div>

//         <hr className="my-2" />

//         {/* Products Grid */}
//         <div className="row mt-4">
//           {isLoadingArrivals ? (
//             <div>Loading...</div>
//           ) : newArrivals && newArrivals.length > 0 ? (
//             newArrivals.slice(0, 8).map((product) => {
//               const productId = product._id || product.productId;
//               const hasDiscount =
//                 product.productsizes && product.productsizes.length > 0;

//               return (
//                 <div
//                   key={productId}
//                   className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4"
//                 >
//                   {/* Outer container with no border, just a background */}
//                   <div
//                     style={{
//                       backgroundColor: "#fff",
//                       borderRadius: "8px",
//                       overflow: "hidden", // ensures rounded corners
//                       height: "100%",
//                     }}
//                   >
//                     {/* TOP: Image container (no border) */}
//                     <div style={{ textAlign: "center" }}>
//                       <img
//                         src={product.imageUrl}
//                         alt={product.name}
//                         style={{
//                           width: "100%",
//                           height: "300px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </div>

//                     {/* BOTTOM: Details container (with border) */}
//                     <div
//                       style={{
//                         border: "1px solid #ccc",
//                         borderTop: "none", // no border line at the top
//                         borderRadius: "0 0 8px 8px", // match parent corners
//                         padding: "10px",
//                       }}
//                     >
//                       {/* Product Name & Description with Icons on Right */}
//                       <div className="d-flex align-items-center justify-content-between mb-2">
//                         <div className="flex-column">
//                           <p
//                             className="fw-semibold mb-0 text-dark"
//                             style={{ fontSize: "1rem" }}
//                           >
//                             {product.name}
//                           </p>
//                           <p
//                             className="mb-0"
//                             style={{ fontSize: "0.9rem", color: "#555" }}
//                           >
//                             {product.description}
//                           </p>
//                         </div>
//                         <div className="d-flex align-items-center">
//                           <img
//                             src={cartIcon}
//                             alt="Add to Cart"
//                             style={{
//                               width: "20px",
//                               height: "20px",
//                               cursor: "pointer",
//                               marginRight: "10px",
//                             }}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handleAddToCart(product);
//                             }}
//                           />
//                           <img
//                             src={
//                               isProductWished(productId)
//                                 ? heartFilled
//                                 : heartTheme
//                             }
//                             alt="Wishlist"
//                             style={{
//                               width: "20px",
//                               height: "20px",
//                               cursor: "pointer",
//                             }}
//                             onClick={(e) => handleAddToWishlist(e, productId)}
//                           />
//                         </div>
//                       </div>

//                       {/* Price & "New" Tag */}
//                       <p className="mb-0" style={{ fontSize: "1rem" }}>
//                         {currencies[product.currencyCode]?.symbol}
//                         {product.price.toFixed(2)}
//                         <span
//                           className="badge text-cyan-600 ms-2"
//                           style={{ fontSize: "0.85rem", padding: "4px 6px" }}
//                         >
//                           New
//                         </span>
//                       </p>
//                       {hasDiscount && (
//                         <p
//                           className="text-success"
//                           style={{ fontSize: "0.9rem", margin: 0 }}
//                         >
//                           20% OFF AT CHECKOUT
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div>No new arrivals found</div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default NewArrivals;
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../api/hooks/useProducts";
import currencies from "@/utils/currencies";
import { useNavigate } from "react-router-dom";
import icon1 from "../../../assets/images/icon-1.png";
import cartIcon from "../../../assets/images/cart.png";
import heartTheme from "../../../assets/images/heart-theme.png";
import heartFilled from "../../../assets/images/active-heart.png";
import useAddToCart from "../../../api/hooks/useAddToCart";
import { useCreateWish } from "../../../../src/api/mutations/useCreateWish";
import { useGetWishList } from "../../../../src/api/queries/useWishList";
import toast from "react-hot-toast";

function NewArrivals({ title }) {
  const { getNewArrivalProducts } = useProducts();
  const { data: newArrivals, isPending: isLoadingArrivals } =
    getNewArrivalProducts;

  const navigate = useNavigate();

  const handleAddToCart = useAddToCart();
  const createWish = useCreateWish();
  const { data: wishList } = useGetWishList();

  const isProductWished = (productId) => {
    if (!wishList || wishList.length === 0) return false;
    return wishList.some((wishItem) =>
      wishItem.product.some((p) => p._id === productId)
    );
  };

  const handleAddToWishlist = (e, productId) => {
    e.preventDefault();
    const alreadyWished = isProductWished(productId);

    const payload = alreadyWished
      ? { remove: [productId] }
      : { productId: [productId] };

    createWish.mutate(payload, {
      onSuccess: (res) => {
        if (res.productId.includes(productId)) {
          toast.success("Product added to wishlist");
        } else {
          toast.error("Product removed from wishlist");
        }
      },
      onError: () => {
        toast.error("Failed to modify wishlist");
      },
    });
  };

  return (
    <section className="new-arrivals">
      <div className="container mx-auto px-4">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-8">
            <div className="left">
              <div className="">
                <img src={icon1} alt="New Arrivals Icon" />
                <h2 className="fw-bold ms-n2">{title}</h2>
              </div>
            </div>
          </div>
          <div className="col-6 text-end">
            {/* <Link to="#">
              View All <i className="fa fa-angle-right ms-2" />
            </Link> */}
          </div>
        </div>

        <hr className="my-2" />

        <div className="row mt-4">
          {isLoadingArrivals ? (
            <div>Loading...</div>
          ) : newArrivals && newArrivals.length > 0 ? (
            newArrivals.slice(0, 8).map((product) => {
              const productId = product._id || product.productId;
              const hasDiscount =
                product.productsizes && product.productsizes.length > 0;

              return (
                <div
                  key={productId}
                  onClick={() =>
                    navigate(`/product/${productId}`, {
                      state: {
                        promoProduct: product,
                        sectionId: product.sectionId,
                      },
                    })
                  }
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4  cursor-pointer "
                >
                  <div
                    className="
    bg-white 
    rounded 
    shadow 
    overflow-hidden 
    transition-transform 
    duration-300 
    hover:scale-105 
    hover:shadow-lg
  "
                    style={{ borderRadius: "8px" }}
                  >
                    <div style={{ height: "300px" }}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div style={{ minHeight: "72px" }}>
                          {" "}
                          <p
                            className="fw-semibold mb-0 text-dark"
                            style={{ fontSize: "1rem" }}
                          >
                            {product.name}
                          </p>
                          <p
                            className="mb-0 text-sm text-gray-600 overflow-hidden text-ellipsis"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              minHeight: "2.6em",
                            }}
                          >
                            `${product.description.slice(0, 35)}.....`
                          </p>
                        </div>

                        <div className="d-flex align-items-center">
                          <img
                            src={cartIcon}
                            alt="Add to Cart"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          />
                          <img
                            src={
                              isProductWished(productId)
                                ? heartFilled
                                : heartTheme
                            }
                            alt="Wishlist"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToWishlist(e, productId);
                            }}
                          />
                        </div>
                      </div>
                      <p className="mb-0" style={{ fontSize: "1rem" }}>
                        {currencies[product.currencyCode]?.symbol}
                        {product.price.toFixed(2)}
                        <span
                          className="badge text-cyan-600 ms-2"
                          style={{ fontSize: "0.85rem", padding: "4px 6px" }}
                        >
                          New
                        </span>
                      </p>
                      {hasDiscount && (
                        <p
                          className="text-success"
                          style={{ fontSize: "0.9rem", margin: 0 }}
                        >
                          20% OFF AT CHECKOUT
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No new arrivals found</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
