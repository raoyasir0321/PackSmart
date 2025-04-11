export const ENDPOINTS = {
  CATEGORY: "/category/",
  ADD_CATEGORY: "/category/add-category",
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
  LOGIN: "/auth/admin/login",
  SIGNUP: "/auth/register",
  // LOGOUT: "/auth/logout",

  // Products
  GET_ALL_PRODUCTS: "/product/",
  ADD_PRODUCTS: "/product/add-product",
  UPLOAD_IMAGE: "/upload-image",
  GET_SINGLE_PRODUCT: (id) => `/product/${id}`,
  UPDATE_PRODUCT: (id) => `/product/update-product/${id}`,
  DELETE_PRODUCT: (id) => `/product/delete-product/${id}`,
  PRODUCT_SIZE_CREATE: `/product-size/create-size`,
  GET_PRODUCT_SIZE: (id) => `/product-size/${id}/get-size`,
  PRODUCT_SIZE_UPDATE: (id) => `/product-size/${id}/update-size`,
  // Orders
  ALL_ORDERS: "/order/admin/",
  UPDATE_ORDER_STATUS: (id, newStatus) => `/order/${id}/status/${newStatus} `,
  SINGLE_ORDER: (id) => `/order/${id}/`,
  // promotion
  CREATE_PROMOTION: "/promotion/create-promotion",
  GET_PROMOTION: "/promotion/",
  SINGLE_PROMOTION: (id) => `/promotion/${id}`,
  DELETE_PROMOTION: (id) => `/promotion/${id}`,
  // related products
  RELATED_PRODUCTS: (id) => `/section/${id}/related-items`,
  // recommendations
  CREATE_RECOMMENDATION: "/recommendation/create-recommendation",
  GET_RECOMMENDATION: "/recommendation/",
  DELETE_RECOMMENDATION: (id) => `/recommendation/${id}`,
  UPDATE_RECOMMENDATION: (id) => `/recommendation/update-recommendation/${id}`,
  // analytics endpoints
  GET_SALES_REPORT: "/analytics/get-sales-report",
  GET_REVENUE_REPORT: "/analytics/get-revenue-report",
  GET_NET_REPORT: "/analytics/get-net-report",
  GET_PRODUCT_REPORT: "/analytics/get-product-report",
  GET_TRANSACTION_REPORT: "/analytics/get-transaction-report",
  GET_SECTION_REPORT: "/analytics/get-section-report",
  GET_CATEGORY_REPORT: "/analytics/get-category-report",
};
