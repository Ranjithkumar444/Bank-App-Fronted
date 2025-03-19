import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        otherName: "",
        gender: "",
        address: "",
        stateOfOrigin: "",
        alternativePhoneNumber: "",
        passcode: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:8080/api/user/create-user", formData, {
                headers: { Authorization: `Bearer ${token}` }

            });

            if (response.data.responseCode === "ACCOUNT_CREATION_SUCCESS") {
                setSuccess("Bank account created successfully!");
                setTimeout(() => navigate("/dashboard"), 2000);
            } else {
                setError(response.data.responseMessage);
            }
        } catch (err) {
            setError("Failed to create account. Please try again.");
        }
    };

    return (
        <div className="create-acc-main">
            
            <h2 className="create-acc-header">Create Bank Account</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit} className="create-acc-form">

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required  className="create-acc-email"/>

                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required  className="create-acc-firstname"/>

                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="create-acc-lastname"/>

                <input type="text" name="otherName" placeholder="Other Name (Optional)" value={formData.otherName} onChange={handleChange}  className="create-acc-othername"/>

                <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required className="create-acc-gender" />

                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required  className="create-acc-address"/>

                <input type="text" name="stateOfOrigin" placeholder="State of Origin" value={formData.stateOfOrigin} onChange={handleChange} required className="create-acc-stateoforigin"/>

                <input type="text" name="alternativePhoneNumber" placeholder="Alternative Phone Number" value={formData.alternativePhoneNumber} onChange={handleChange} className="create-acc-altphonenumber"/>

                <input type="password" name="passcode" placeholder="Passcode" value={formData.passcode} onChange={handleChange} required className="create-acc-password"/>

                <button type="submit" className="create-acc-submit">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;

