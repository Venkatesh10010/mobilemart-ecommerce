import { Link } from "react-router-dom";

function Confirmation({ order }) {
  if (!order) {
    return (
      <div className="page">
        <h2>No order found</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="page success-page">
      <h1>Order Placed Successfully!</h1>

      <p>Your order has been confirmed.</p>

      <h3>Order ID: {order.id}</h3>
      <p>Delivery Slot: {order.deliverySlot}</p>
      <p>Payment: {order.payment}</p>
      <p>Total: ₹{order.total.toFixed(2)}</p>

      <Link to="/">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default Confirmation;
