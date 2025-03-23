
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
  
    const [accountDetails, setAccountDetails] = useState(
      JSON.parse(localStorage.getItem("accountDetails")) || null
    );
    const [loading, setLoading] = useState(!accountDetails); 
  
    const hasFetched = useRef(false);

    console.log(token);
  
    useEffect(() => {
      if (!token) {
        navigate("/login");
        return;
      }
  
      if (accountDetails) {
        setLoading(false);
        return;
      }
  
      if (hasFetched.current) return;
      hasFetched.current = true;
  
      axios
        .get("http://localhost:8080/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.message === "No bank account found. Please create one.") {
              navigate("/create-account"); 
            } else {
              const { email, accountNumber, accountBalance } = response.data;
              setAccountDetails({ email, accountNumber, accountBalance });
              localStorage.setItem("accountDetails", JSON.stringify(response.data));
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching dashboard details:", error);
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }
        })
        .finally(() => setLoading(false));
    }, [token]);
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : accountDetails ? (
          <>
            <p className="welcome">Welcome{"," +" " + accountDetails.firstName + " " + accountDetails.lastName }</p>

            <p className="dashboard-acc-num">Account Number: {accountDetails.accountNumber}</p>

            <button  onClick={() => navigate("/withdraw")} className="withdraw-btn">Withdraw</button>

            <button onClick={() => navigate("/credit")} className="credit-btn">Credit</button>

            <button onClick={() => navigate("/transfer")} className="transfer-btn">Transfer</button>

            <button onClick={() => navigate("/balance")} className="balance-btn">Balance</button>

            <button onClick={() => navigate("/transaction-history")}  className="transaction-history-btn">Transaction-History</button>
            
          </>
        ) : null}
      </div>
    );
  };
  
  export default Dashboard;
  