import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transferAmount } from "../services/auth";


const Transfer = () => {
    const[fromAccountNumber,setfromAccountNumber] = useState("");
    const[toAccountNumber,settoAccountNumber] = useState("");
    const[passcode,setPasscode] = useState("");
    const[amount,setAmount] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleTransfer = async () => {
        if(!token){
            console.log("User Not Authenticated");
        }

        const transferData = {
            passcode,
            amount: parseFloat(amount),
            toAccountNumber: parseInt(toAccountNumber),
            fromAccountNumber : parseInt(fromAccountNumber)
        }

        try{
            const response = await transferAmount(transferData,token);
            console.log(response.data);
            alert(response.data);
            navigate("/dashboard")
        }
        catch(error){   
            console.error("Transfer Failed", error.response?.data || error.message);
            alert("Transfer failed: " + (error.response?.data?.message || error.message));
        }
    }


    return(

        <div className="transfer-main">
            <h2 className="transfer-header">Transfer Amount</h2>

            <input type="number" className="transfer-from" placeholder="From" onChange={(e) => setfromAccountNumber(e.target.value)} ></input>
            <input type="number" className="transfer-to" placeholder="To" onChange={(e) => settoAccountNumber(e.target.value)}></input>
            <input type="number" className="transfer-amount" placeholder="Amount" onChange={(e) => {
                setAmount(e.target.value);
            }}></input>
            <input type="password" className="transfer-passcode" placeholder="Passcode" onChange={(e) => {
                setPasscode(e.target.value);
            }}></input>

            <button onClick={handleTransfer} className="transfer-submit-btn">Transfer</button>
        </div>

    )

}

export default Transfer;