import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { useUpdateUser } from "../../../../src/api/mutations/useUser";
import { Spinner } from "react-bootstrap";
// import { updateUser } from "src/api/services/authService";

function Settings() {
  const { user } = useAuth();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    console.log("Submitted data:", data);

    console.log("Dirty fields", dirtyFields);

    const updatedData = {};
    const updatePayload = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, updatedData);
    console.log("Payload", updatePayload);
    updateUser(updatePayload, {
      onSuccess: (response) => {
        console.log("Update success", response);
        // navigate("/my-account");
      },
      onError: (error) => {
        console.error("Update failed", error);
      },
      onSettled: () => {
        // setLoading(false);
      },
    });
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="bg-white rounded shadow p-4">
          <h2 className="h5 text-uppercase mb-4">Account Settings</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Username must be alphanumeric",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-danger mt-1">{errors.username.message}</p>
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  {...register("firstName", {
                    required: "First name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "First name must contain only letters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-danger mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last name"
                  {...register("lastName", {
                    required: "Last name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Last name must contain only letters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-danger mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="col-md-6 mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Password must be up to 50 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="col-md-6 mb-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Phone number must be between 10 and 15 digits",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-danger mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="col-12">
                <button type="submit" className="btn btn-theme-yellow w-100">
                  {isUpdating ? <Spinner /> : "SAVE CHANGES"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
