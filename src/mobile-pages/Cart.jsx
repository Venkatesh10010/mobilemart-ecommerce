import { Link } from "react-router-dom";
import Steps from "../components/Steps";

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page">
      <Steps currentStep={1} />
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>

                <div className="quantity">
                  <button onClick={() => onDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <Link to="/delivery">
              <button>Proceed to Delivery</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
