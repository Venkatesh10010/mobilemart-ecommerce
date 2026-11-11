function Profile({ orders }) {
  return (
    <div className="page">
      <h2>Customer Profile</h2>

      <div className="profile-card">
        <h3>Customer Details</h3>
        <p>Name: MobileMart Customer</p>
        <p>Email: customer@example.com</p>
      </div>

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Total: ₹{order.total.toFixed(2)}</p>
            <p>Payment: {order.payment}</p>
            <p>Delivery: {order.deliverySlot}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
