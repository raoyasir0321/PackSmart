import React from "react";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../../../src/api/mutations/useUser";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const {
    data,
    isPending: isUpdating,
    isSuccess,
    error: updateError,
    mutate,
  } = useUpdatePassword();

  const onSubmit = (formData) => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "New password and confirmation do not match",
      });
      return;
    } else {
      clearErrors("confirmPassword");
    }
    mutate({ oldPassword: currentPassword, newPassword });
  };

  const handleVisibility = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target");
    const inputField = document.getElementById(targetId);
    if (inputField) {
      if (inputField.type === "password") {
        inputField.type = "text";
        e.currentTarget.querySelector("i").classList.remove("fa-eye");
        e.currentTarget.querySelector("i").classList.add("fa-eye-slash");
      } else {
        inputField.type = "password";
        e.currentTarget.querySelector("i").classList.remove("fa-eye-slash");
        e.currentTarget.querySelector("i").classList.add("fa-eye");
      }
    }
  };

  return (
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="settings-inner">
        <div className="top-heading">{/* <span>CHANGE PASSWORD</span> */}</div>
        <div className="info-inner">
          <div className="row">
            <div className="profile-form">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="row">
                  {/* Current Password */}
                  <div className="col-xl-12 col-md-12">
                    <div className="mb-4 position-relative">
                      <label>Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="form-control"
                        placeholder="********"
                        {...register("currentPassword", {
                          required: "Current password is required",
                        })}
                      />
                      <button
                        type="button"
                        className="btn toggle-password"
                        data-target="currentPassword"
                        onClick={handleVisibility}
                      >
                        <i className="fa fa-eye" />
                      </button>
                      {errors.currentPassword && (
                        <span className="text-danger">
                          {errors.currentPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* New Password */}
                  <div className="col-xl-12 col-md-12">
                    <div className="mb-4 position-relative">
                      <label>New Password</label>
                      <input
                        id="newpassword"
                        type="password"
                        className="form-control"
                        placeholder="********"
                        {...register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 6,
                            message: "Minimum length is 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="btn toggle-password"
                        data-target="newpassword"
                        onClick={handleVisibility}
                      >
                        <i className="fa fa-eye" />
                      </button>
                      {errors.newPassword && (
                        <span className="text-danger">
                          {errors.newPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div className="col-xl-12 col-md-12">
                    <div className="mb-4 position-relative">
                      <label>Confirm Password</label>
                      <input
                        id="confirmpassword"
                        type="password"
                        className="form-control"
                        placeholder="********"
                        {...register("confirmPassword", {
                          required: "Please confirm your new password",
                        })}
                      />
                      <button
                        type="button"
                        className="btn toggle-password"
                        data-target="confirmpassword"
                        onClick={handleVisibility}
                      >
                        <i className="fa fa-eye" />
                      </button>
                      {errors.confirmPassword && (
                        <span className="text-danger">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div className="col-md-12">
                    <div className="mb-0">
                      <button type="submit" className="btn btn-theme-yellow">
                        {isUpdating ? "Updating..." : "CHANGE PASSWORD"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {isSuccess && (
                <div className="alert alert-success mt-3">
                  Password updated successfully!
                </div>
              )}
              {updateError && (
                <div className="alert alert-danger mt-3">
                  {updateError.message || "Failed to update password."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
