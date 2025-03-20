import React, { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import loginImage from "../img-files/bankbaground.jpg";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
          const response = await loginUser(formData);
          console.log("Login Response:", response.data);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          setUser(response.data.user);
          console.log("User state after login:", response.data.user);
          alert("Login Successful!");
          navigate("/dashboard");
      } catch (error) {
          console.log("Login Error:", error.response?.data);
          setError(error.response?.data?.message || "Invalid Credential. Login failed!");
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="login-main">

      <img src={loginImage} alt="Login Image" className="login-image"></img>

      <h2 className="bank-name">Ind Bank</h2>

      <h3 className="login">Login</h3>

      {error && <p className="login-err">{error}</p>}
      
      <form onSubmit={handleSubmit} className="login-form">

        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="login-email" />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="login-password" />

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="dont-have-account-register">

        Don't have an account?{" "}

        <button className="signup-btn" onClick={() => navigate("/signup")}>
        Sign Up
        </button>

      </p>

      </form>
    </div>
  );
};

export default Login;
