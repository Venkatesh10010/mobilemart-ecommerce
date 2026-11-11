import { Link } from "react-router-dom";
import Steps from "../components/Steps";

function Delivery({ selectedSlot, setSelectedSlot }) {
  const slots = [
    "9 AM - 11 AM",
    "11 AM - 1 PM",
    "5 PM - 7 PM"
  ];

  return (
    <div className="page">
      <Steps currentStep={2} />

      <h2>Select Delivery Slot</h2>

      <div className="delivery-slots">
        {slots.map((slot) => (
          <button
            key={slot}
            className={selectedSlot === slot ? "selected" : ""}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="checkout-actions">
        <Link to="/cart">
          <button>Back to Cart</button>
        </Link>

        <Link to="/payment">
          <button disabled={!selectedSlot}>Continue to Payment</button>
        </Link>
      </div>
    </div>
  );
}

export default Delivery;
