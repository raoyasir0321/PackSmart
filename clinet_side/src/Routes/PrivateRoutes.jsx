import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/components/ui/dialog";

import Login from "../pages/Login/Login";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
  const token = localStorage.getItem("token");

  if (isLoading) return <div>Loading...</div>;

  // If there is no token or no authenticated user, render the login dialog
  if (!token || !user) {
    console.log("No token or user found");
    return (
      <Dialog open>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Please sign in to access this page.
            </DialogDescription>
          </DialogHeader>
          <Login />
        </DialogContent>
      </Dialog>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
