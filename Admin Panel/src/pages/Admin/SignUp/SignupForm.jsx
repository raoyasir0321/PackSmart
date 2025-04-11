const SignupForm = ({ formData, handleChange, handleSignup }) => {
    return (
      <form
        onSubmit={handleSignup}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          />
        </div>
  
          <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          />
        </div>
  
          <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          />
        </div>
  
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          />
        </div>
  
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          />
        </div>
  
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          />
        </div>
  

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black hover:bg-gray-700 text-white rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    );
  };
  
  export default SignupForm;
  