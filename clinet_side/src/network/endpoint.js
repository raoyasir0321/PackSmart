export const ENDPOINTS = {
  CATEGORY: "/category/",
  ADD_CATEGORY: "/category/add-category",
  CATEGORIES_AND_SECTIONS: "/category/section",
  CATEGORY_SECTIONS: (id) => `/category/${id}/section`,
  DELETE_CATEGORY: (id) => `/category/delete-category/${id}`,
  // sections
  ADD_SECTION: "/section/add-section",
  GET_SECTION_BY_ID: (id) => `/section/${id}`,
  GET_ALL_SECTIONS: "/section/",
  UPDATE_SECTION: (id) => `/section/update-section/${id}`,
  DELETE_SECTION: (id) => `/section/delete-section/${id}`,
  GET_SECTION_PRODUCTS: (id) => `/section/${id}/product`,
  GET_SECTION_CATEGORIES: (id) => `/section/${id}/category`,
  GET_ALL_SECTIONS_WITH_CATEGORIES: "/section/category",
  // auth
  LOGIN: "/auth/login",
  GET_USER: "/user/",
  SIGNUP: "/auth/register",
  UPDATE_PASSWORD: "/user/updatePassword",
  // LOGOUT: "/auth/logout",

  // Products
  GET_ALL_PRODUCTS: "/product/",
  ADD_PRODUCTS: "/product/add-product",
  UPLOAD_IMAGE: "/upload-image",
  GET_SINGLE_PRODUCT: (id) => `/product/${id}`,
  UPDATE_PRODUCT: (id) => `/product/update-product/${id}`,
  DELETE_PRODUCT: (id) => `/product/delete-product/${id}`,
  GET_PRODUCT_SIZE: (id) => `/product-size/${id}/get-size`,
  GET_NEW_ARRIVALS: "/product/new-arrivals",
  //  suggested Products
  GET_SUGGESTED_PRODUCTS: "/productSuggestion",
  // Orders
  CREATE_ORDER: "/order/create",
  My_ORDERS: "/order",
  SINGLE_ORDER: (id) => `/order/${id}/`,
  ORDER_NUMBERS: "/order/user/order-numbers",
  // promotions
  GET_PROMOTION: "/promotion/",
  SINGLE_PROMOTION: (id) => `/promotion/${id}`,
  // related products`
  GET_RELATED_PRODUCTS: (id) => `section/${id}/related-items`,
  //
  GET_RECOMMENDATION: "/recommendation/",
  //  search
  SEARCH: (query) => `/filter/filter-by-words?keyword=${query}`,
  //  wishlist
  SAVE_WISH: "/wishes/create-wish",
  GET_WISH: "/wishes/get-wish",
};
