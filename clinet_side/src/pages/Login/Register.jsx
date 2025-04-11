import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUpUser } from "../../../src/api/mutations/useAuthMutation";

const Register = ({ setActiveTab, isMobileScreen, path }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");

  const { mutate: signUpUser, isLoading: isSignUpLoading } = useSignUpUser();

  const onSubmit = (data) => {
    setLoading(true);
    signUpUser(data, {
      onSuccess: () => {
        navigate(path || "/my-account");
      },
      onError: (error) => {
        console.error("Signup failed", error);
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <label>
                Username: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Enter a unique username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Username can only contain letters or digits",
                  },
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be at most 20 characters",
                  },
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
              />
              {errors.username && (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <label>
                First Name: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Please Enter First Name"
                {...register("firstName", {
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z ']+$/,
                    message: "First Name must contain only alphabets",
                  },
                  maxLength: {
                    value: 50,
                    message: "First Name must be up to 50 characters",
                  },
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
              />
              {errors.firstName && (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <label>
                Last Name: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Please Enter Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z ']+$/,
                    message: "Last Name must contain only alphabets",
                  },
                  maxLength: {
                    value: 50,
                    message: "Last Name must be up to 50 characters",
                  },
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
              />
              {errors.lastName && (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

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
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <label>
                Phone Number: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="e.g. 03342843072"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message:
                      "Phone number must be 7 to 15 digits (no spaces or dashes)",
                  },
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
              />
              {errors.phoneNumber && (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-4 position-relative">
              <label>
                Password: <span style={{ color: "red" }}>*</span>
              </label>
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
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="col-md-12">
            <div className="mb-4 position-relative">
              <label>
                Confirm Password: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Please Enter Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 8,
                    message: "Confirm Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Confirm Password must be up to 50 characters",
                  },
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className={`form-control ${isMobileScreen && "p-2 px-3"}`}
                maxLength={51}
              />
              <button
                type="button"
                className="btn toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={
                    showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
                  }
                />
              </button>
              {errors.confirmPassword && (
                <p
                  role="alert"
                  className="mt-1 mx-1"
                  style={{ color: "red", fontWeight: "400" }}
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* TERMS & CONDITIONS */}
          <div className="col-md-12">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                {...register("agree", {
                  required: "You must agree to continue",
                })}
              />
              <label className="form-check-label ms-2 mb-0">
                I agree with{" "}
                <Link to={"/return-policy"} className="text-decoration-none">
                  Terms of Condition
                </Link>{" "}
                and{" "}
                <Link to={"/privacy-policy"} className="text-decoration-none">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.agree && (
              <p
                role="alert"
                className="mt-1 mx-1"
                style={{ color: "red", fontWeight: "400" }}
              >
                {errors.agree.message}
              </p>
            )}
          </div>

          <div className="col-md-12">
            <div className="mb-4">
              <button
                type="submit"
                className="btn btn-theme-yellow w-100"
                disabled={loading || isSignUpLoading}
              >
                SIGN UP <i className="fa fa-angle-right ms-2" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
