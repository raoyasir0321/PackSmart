import React, { createContext, useReducer, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existItem = state.cart.find(
        (x) => x.id === item.id && x.size === item.size
      );
      let newCart;
      if (existItem) {
        newCart = state.cart.map((x) =>
          x.id === item.id && x.size === item.size
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      } else {
        newCart = [...state.cart, item];
      }
      return { ...state, cart: newCart };
    }
    case "REMOVE_FROM_CART": {
      const newCart = state.cart.filter(
        (x) => !(x.id === action.payload.id && x.size === action.payload.size)
      );
      return { ...state, cart: newCart };
    }
    case "UPDATE_QUANTITY": {
      const { id, size, quantity } = action.payload;
      const newCart = state.cart.map((x) =>
        x.id === id && x.size === size ? { ...x, quantity } : x
      );
      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success("Product successfully added to cart!");
  };

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const updateCartItem = (id, size, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
  };

  return (
    <CartContext.Provider
      value={{ cart: state.cart, addToCart, removeFromCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
