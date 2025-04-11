import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../../../src/api/mutations/useAuthMutation";

const LoginForm = ({ path, isMobileScreen }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({}); // Stores API errors

  const { mutate: loginUser, isLoading } = useLoginUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    setServerErrors({});
    loginUser(data, {
      onSuccess: (response) => {
        console.log("Login success", response);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        console.error("Login failed", error);

        if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;

          if (errorMessage.includes("Invalid email")) {
            setError("email", { type: "server", message: "Email not found" });
          } else if (errorMessage.includes("Incorrect password")) {
            setError("password", {
              type: "server",
              message: "Incorrect password",
            });
          } else {
            setServerErrors({ general: errorMessage }); // Show generic errors
          }
        } else {
          setServerErrors({
            general: "Something went wrong. Please try again.",
          });
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <label>
                Email Address: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Please Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4 position-relative">
              <div className="d-flex align-items-center justify-content-between">
                <label>
                  Password: <span style={{ color: "red" }}>*</span>
                </label>
                <Link to="/forgot-password" className="forget">
                  Forgot Password?
                </Link>
              </div>
              <input
                placeholder="Please Enter Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be up to 50 characters",
                  },
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
                maxLength={51}
              />
              <button
                type="button"
                className="btn toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <button
                className="btn btn-theme-yellow w-100"
                type="submit"
                disabled={loading || isLoading}
              >
                {loading || isLoading ? (
                  <>
                    <i className="fa fa-spinner fa-spin me-2" /> Signing In...
                  </>
                ) : (
                  <>
                    SIGN IN <i className="fa fa-angle-right ms-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {serverErrors.general && (
        <div className="alert alert-danger mt-3" role="alert">
          {serverErrors.general}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
