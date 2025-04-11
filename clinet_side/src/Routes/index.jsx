import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Category from "../pages/Categories";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import AboutUs from "../pages/Policy/AboutUs";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ComingSoon from "../pages/Policy/ComingSoon";
import MyAccount from "../pages/Dashboard";
import OrderConfirm from "../pages/OrderConfirm.jsx";
import PageNotFound from "../pages/PageNotFound/index.jsx";
import SectionsPage from "../pages/Section/index.jsx";
import CustomBudget from "../pages/CustomBudget";
import CategoriesMainSection from "../pages/Categories/CategoriesMainSection/CategoriesMainSection";
import Recommendations from "../../src/pages/Home/Recommendations";
import PrivateRoute from "./PrivateRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/section-products/:id" element={<Category />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route
        path="/products"
        element={<CategoriesMainSection suggested={true} />}
      />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/section/:id" element={<SectionsPage />} />
      <Route path="/order-confirm" element={<OrderConfirm />} />
      <Route path="/custom-budget" element={<CustomBudget />} />
      <Route path="/recommendations" element={<Recommendations />} />

      <Route element={<PrivateRoute />}>
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-cart" element={<Cart />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
