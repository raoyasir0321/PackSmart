import { useAuth } from "@/api/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import SignupForm from "./SignupForm"; 

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      const response = await signUp.mutateAsync(formData);
        navigate("/admin/dashboard");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex bg-gray-100 justify-center items-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-extrabold mb-6 text-left">Sign Up</h1>

        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSignup={handleSignup}
        />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/"
            className="text-blue-500 hover:underline font-medium"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
