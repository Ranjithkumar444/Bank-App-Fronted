import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { balanceCheck } from "../services/auth";

const Balance = () => {
    const [passcode, setPasscode] = useState("");
    const [balance, setBalance] = useState(null); 
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleBalance = async () => {
        if (!token) {
            alert("User not Authenticated");
            return;
        }

        const balanceData = { passcode };

        try {
            const response = await balanceCheck(balanceData, token);
            console.log("Response:", response);

            if (response.data) {
                setBalance(response.data.balance || response.data);
                setTimeout(() => {
                    navigate("/dashboard")
                },5000);
            } else {
                alert("Balance response is invalid.");
            }
        } catch (error) {
            console.error("Balance Request failed", error.response?.data || error.message);
            alert("Balance Request failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="balance-main">
            <h2 className="balance-header">Balance Check</h2>

            <input
                type="password"
                className="balance-passcode"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
            />

            <button className="balance-submit-btn" onClick={handleBalance}>
                Get Balance
            </button>

            <div className="balance-show">
                {balance !== null ? `Account Balance: ${balance}` : ""}
            </div>
        </div>
    );
};

export default Balance;
