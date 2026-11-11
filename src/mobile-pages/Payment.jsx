import { Link, useNavigate } from "react-router-dom";
import Steps from "../components/Steps";

function Payment({ payment, setPayment, onPlaceOrder }) {
  const navigate = useNavigate();

  function handlePlaceOrder() {
    onPlaceOrder();
    navigate("/confirmation");
  }

  return (
    <div className="page">
      <Steps currentStep={3} />

      <h2>Payment Method</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={payment === "COD"}
            onChange={() => setPayment("COD")}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Online"
            checked={payment === "Online"}
            onChange={() => setPayment("Online")}
          />
          Online Payment (Demo)
        </label>
      </div>

      <div className="checkout-actions">
        <Link to="/delivery">
          <button>Back</button>
        </Link>

        <button onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Payment;
