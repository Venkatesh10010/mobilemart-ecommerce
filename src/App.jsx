
import "./App.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./mobile-pages/Home";
import Cart from "./mobile-pages/Cart";
import Delivery from "./mobile-pages/Delivery";
import Payment from "./mobile-pages/Payment";
import Confirmation from "./mobile-pages/Confirmation";
import Profile from "./mobile-pages/Profile";


function App() {
  const [cart, setCart] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [payment, setPayment] = useState("COD");
  const [currentOrder, setCurrentOrder] = useState(null);

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("mobilemart-orders") || "[]");
  });

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(id) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  function placeOrder() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      id: "DEMO-" + Date.now(),
      items: cart,
      total,
      deliverySlot: selectedSlot,
      payment,
      date: new Date().toLocaleString()
    };

    setCurrentOrder(order);

    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(
      "mobilemart-orders",
      JSON.stringify(updatedOrders)
    );

    setCart([]);
    setSelectedSlot("");
  }

  return (
    <>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route
           path="/"
           element={
              <Home
                cart={cart}
                onAddToCart={addToCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          }
        />

        <Route
          path="/delivery"
          element={
            <Delivery
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          }
        />

        <Route
          path="/payment"
          element={
            <Payment
              payment={payment}
              setPayment={setPayment}
              onPlaceOrder={placeOrder}
            />
          }
        />

        <Route
          path="/confirmation"
          element={<Confirmation order={currentOrder} />}
        />

        <Route
          path="/profile"
          element={<Profile orders={orders} />}
        />
      </Routes>

      <footer className="footer">
        <p>© 2026 MobileMart | Demo E-commerce Project</p>
      </footer>
    </>
  );
}

export default App;
