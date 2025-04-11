import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

import Products from "../pages/Admin/Products";
import Dashboard from "../pages/Admin/Dashboard";
import Categories from "../pages/Admin/Categories";
import Sections from "../pages/Admin/Sections";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import Login from "@/pages/Admin/Login";
import Signup from "@/pages/Admin/SignUp/SignUp";
import SectionDetails from "@/pages/Admin/Sections/SectionDetails";
import ProductDetails from "@/pages/Admin/Products/ProductDetails";
import Orders from "@/pages/Admin/Orders";
import OrderDetails from "@/pages/Admin/Orders/OrderDetails";
import Promotions from "@/pages/Admin/Promotions";
import PromotionDetails from "@/pages/Admin/Promotions/PromotionDetails";
import Recommendations from "@/pages/Admin/Recommendations";
const PrivateRoute = ({ element }) => {
  // const { isAuthenticated, isLoading } = useAuth();
  const isAuthenticated = localStorage.getItem("tokenAdmin") ? true : false;
  // if (isLoading) return <p>Loading...</p>;
  console.log(isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? <Navigate to="/admin/dashboard" /> : element;
};

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Login />} />} />
        <Route
          path="/admin/signup"
          element={<PublicRoute element={<Signup />} />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
          }
        />
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Categories />
                </AdminLayout>
              }
            />
          }
        />
        <Route
          path="/admin/sections"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Sections />
                </AdminLayout>
              }
            />
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Products />
                </AdminLayout>
              }
            />
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Orders />
                </AdminLayout>
              }
            />
          }
        />
        <Route
          path="/admin/order-details"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <OrderDetails />
                </AdminLayout>
              }
            />
          }
        />
        <Route
          path="/promotions"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Promotions />
                </AdminLayout>
              }
            />
          }
        />
  
        <Route
          path="/promotionDetails/:id"
          element={<PrivateRoute element={<PromotionDetails />} />}
        />

        <Route
          path="/sections/:id"
          element={<PrivateRoute element={<SectionDetails />} />}
        />
        <Route path="/admin/products/:id" element={<ProductDetails />} />

        <Route
          path="/admin/recommendations"
          element={
            <PrivateRoute
              element={
                <AdminLayout>
                  <Recommendations />
                </AdminLayout>
              }
            />
          }
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/admin/dashboard" : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
