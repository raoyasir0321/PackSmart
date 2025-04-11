import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const useAddToCart = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product, options = {}) => {
    console.log("product", product);
    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      currency: product.currencyCode,
      image: product.imageUrl,
      quantity: options.quantity || 1,
      size:
        options.size ||
        (product.productsizes &&
        product.productsizes.length > 0 &&
        product.productsizes[0].sizes &&
        product.productsizes[0].sizes.length > 0
          ? product.productsizes[0].sizes[0].name
          : null),
    };

    addToCart(item);
    // navigate("/my-cart");
  };

  return handleAddToCart;
};

export default useAddToCart;
