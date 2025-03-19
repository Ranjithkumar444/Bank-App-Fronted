import React, { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    gender: "male",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(formData);
      alert("Signup Successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-main">

      <h2 className="signup">Signup</h2>
      {error && <p className="sign-err">{error}</p>}

      <form onSubmit={handleSubmit} className="signup-form">

        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="signup-username" />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="signup-email" />

        <input type="password" name="password" 
        placeholder="Password" onChange={handleChange} required className="signup-password" />

        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="signup-phonenumber" />

        <select name="gender" onChange={handleChange} className="signup-gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
        <button type="submit" className="signup-submit-btn" disabled={loading}>
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
