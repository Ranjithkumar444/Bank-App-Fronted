import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { withdrawAmount } from "../services/auth"; // Import the withdraw function

const Withdraw = () => {
  const [passcode, setPasscode] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleWithdraw = async () => {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    const withdrawData = {
      passcode,
      amount: parseFloat(amount),
    };

    try {
      const response = await withdrawAmount(withdrawData, token);
      console.log("Withdrawal successful!", response.data);
      alert("Withdrawal successful! New balance: " + response.data.newBalance);
      navigate("/dashboard"); // Navigate back to dashboard after success
    } catch (error) {
      console.error("Withdrawal failed", error.response?.data || error.message);
      alert("Withdrawal failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="withdraw-main">
      <h2 className="withdraw-header">Withdraw Money</h2>
      <input
        type="password"
        placeholder="Enter Passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        className="withdraw-passcode"
      />
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="withdraw-amount"
      />
      <button onClick={handleWithdraw} className="withdraw-submit-btn">Withdraw</button>
    </div>
  );
};

export default Withdraw;
