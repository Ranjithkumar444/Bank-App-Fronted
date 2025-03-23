import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactionHistory } from "../services/auth";

const TransactionHistory = () => {
    const [accNumber, setAccNumber] = useState("");
    const [passcode, setPasscode] = useState("");
    const [transactions, setTransactions] = useState([]); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleTransactionHistory = async () => {
        setLoading(true);
        const transactionHistoryData = {
            accountNumber: accNumber,
            passcode,
        };

        try {
            const response = await transactionHistory(transactionHistoryData, token);
            console.log(response.data);
            setTransactions(response.data); 
        } catch (error) {
            console.error("Error in fetching Transaction History", error.response?.data || error.message);
            alert("Error in fetching Transaction History: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transhistory-main">
            <h2 className="transhistory-header">Transaction History</h2>

            <input
                className="transhistory-accnumber"
                placeholder="Account Number"
                onChange={(e) => setAccNumber(e.target.value)}
            />

            <input
                className="transhistory-passcode"
                placeholder="Passcode"
                type="password"
                onChange={(e) => setPasscode(e.target.value)}
            />

            <button className="transhistory-submit-btn" onClick={handleTransactionHistory} disabled={loading}>
                {loading ? "Loading..." : "Get Transaction History"}
            </button>

            {transactions.length > 0 && (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.transactionType}</td>
                                <td>{transaction.transactionStatus}</td>
                                <td>{transaction.description}</td>
                                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;
