import { useAuth } from "@/api/hooks/useAuth";
import DynamicForm from "@/components/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const { login} = useAuth()
  
  const {isPending:isLoading} = login
  const fields = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          message: "Enter a valid email",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      validation: {
        required: "Password is required",
        minLength: { value: 6, message: "Minimum 6 characters required" },
      },
    },
  ];

  const handleLogin = async(data) => {
    try {
      console.log("Form Data:", data);
      const response = await login.mutateAsync(data);
        navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed!");
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-extrabold mb-4">Login</h1>
      <DynamicForm fields={fields}  isLoading= {isLoading} onSubmit={handleLogin} buttonText="Login" />
      <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/admin/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Signup here
          </Link>
        </p>
    </div>
  </div>
  );
};

export default Login;
