// import { ADD_QUANTITY, REMOVE_QUANTITY } from "../redux/constant/constants";

let countryCurrencySymbol = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CAD ",
  AUD: "AUD ",
};

export const amoutRateConversion = (amount, rate, country) => {
  let newAmount = (parseFloat(amount) * rate).toFixed(2);
  let final = (newAmount * 100) / 100;
  if (countryCurrencySymbol[country]) {
    return countryCurrencySymbol[country] + String(final);
  }
  return country?.toUpperCase() + " " + String(final);
};

export const valueRateConversion = (value, rate, country = null) => {
  let newAmount = (parseFloat(value) * rate).toFixed(2);
  let final = (newAmount * 100) / 100;
  return country
    ? countryCurrencySymbol[country] + String(final)
    : String(final);
};

export const symbolAmount = (amount, country) => {
  if (!countryCurrencySymbol[country]) {
    return country?.toUpperCase() + String(amount);
  }
  return (
    (countryCurrencySymbol[country] || country?.toUpperCase()) + String(amount)
  );
};

export const reconvertAmount = (amount, rate) => {
  let newAmount = (parseFloat(amount) / rate).toFixed(2);
  return newAmount;
};

export const getVariantsArray = (variantsObject) => {
  let temp = [];
  let variants = Object.values(variantsObject || {});
  if (variants.length < 1) {
    return [];
  }
  for (let i = 0; i < variants.length; i++) {
    const values = Object.values(variants[i]);
    if (values.length > 0) {
      const key = values[0].variant_type_title;
      const display_style_id = values[0].display_style_id;
      if (display_style_id === 4) {
        temp.push({ key, values, display_style_id });
      } else {
        temp.push({ key, values, display_style_id });
      }
    }
  }
  return temp;
};

export const cartForApi = (cartData) => {
  return cartData.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
    variant_combo_id: item.variant_combo_id || null,
    price: item.sale_price || item.price,
  }));
};

// export const handleQuantityChange = (dispatch, cartItem, newQuantity) => {
//   const parsedQuantity = parseInt(newQuantity, 10);

//   if (newQuantity === "") {
//     dispatch({ type: ADD_QUANTITY, payload: cartItem, quantity: 0 });
//     return;
//   }

//   if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
//     const difference = parsedQuantity - cartItem.quantity;
//     if (difference > 0) {
//       dispatch({ type: ADD_QUANTITY, payload: cartItem, quantity: difference });
//     } else if (difference < 0) {
//       dispatch({
//         type: REMOVE_QUANTITY,
//         payload: cartItem,
//         quantity: Math.abs(difference),
//       });
//     }
//   }
// };




export function isMobileScreen() {
  const screenWidth = window.innerWidth;
  const mobileBreakpoint = 768;
  return screenWidth <= mobileBreakpoint;
}

export function isTabView() {
  const screenWidth = window.innerWidth;
  const minWidth = 769;
  const maxWidth = 1023;
  return screenWidth >= minWidth && screenWidth <= maxWidth;
}

export function isTabViewWishlist() {
  const screenWidth = window.innerWidth;
  const minWidth = 769;
  const maxWidth = 992;
  return screenWidth >= minWidth && screenWidth <= maxWidth;
}

// statusBarUtil.js

export function changeStatusBarColor(color) {
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", color);
  document
    .querySelector('meta[name="msapplication-navbutton-color"]')
    .setAttribute("content", color);

  if (navigator.standalone) {
    document
      .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      .setAttribute("content", color);
  }
}

export const isDevToolsOpen = () => {
  const threshold = 160;
  const widthDiff = window.outerWidth - window.innerWidth > threshold;
  const heightDiff = window.outerHeight - window.innerHeight > threshold;
  return heightDiff;
};
