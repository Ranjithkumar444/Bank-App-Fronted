import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { creditAmount } from "../services/auth";


const Credit = () => {
    const [passcode,setPasscode] = useState("");
    const [amount,setAmount] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const creditHandle = async () => {
        if(!token){
            console.log("User is Not Authenticated");
            return;
        }

        const creditData = {
            passcode,
            amount: parseFloat(amount),
        }

        try{
            const response = await creditAmount(creditData,token)
            console.log(response.data);
            alert(response.data);
            navigate("/dashboard");
        }   
        catch(error){
            console.error("Withdrawal failed", error.response?.data || error.message);
            alert("Withdrawal failed: " + (error.response?.data?.message || error.message));
        }
    };

    return(
        <div className="credit-main">
            <h2 className="credit-header">Credit Amount</h2>

            <input className="credit-amount" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} ></input>

            <input className="credit-passcode" type="password" placeholder="Passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} ></input>

            <button className="credit-submit-btn" onClick={creditHandle}>Credit</button>
        </div>
    )
} 

export default Credit;