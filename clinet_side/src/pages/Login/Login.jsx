import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import Register from "./Register";

const Login = () => {
  const locator = useLocation();
  const stateFromLocator = locator?.state;

  const [activeTab, setActiveTab] = useState(
    stateFromLocator === "signup" ? "signup" : "signin"
  );
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobileScreen(mediaQuery.matches);

    const handleResize = () => setIsMobileScreen(mediaQuery.matches);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center mx-auto my-8">
      <div className="w-full max-w-md p-4 bg-transparent">
        <div className="flex justify-center space-x-8 mb-4">
          <span
            className={`cursor-pointer ${
              activeTab === "signin"
                ? "font-semibold border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "signup"
                ? "font-semibold border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </span>
        </div>

        {activeTab === "signin" ? (
          <LoginForm path={stateFromLocator} isMobileScreen={isMobileScreen} />
        ) : (
          <Register
            setActiveTab={setActiveTab}
            isMobileScreen={isMobileScreen}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
