
import { useEffect, useState } from "react";
import { getProducts } from "../services/productAPI";
import ProductCard from "../components/ProductCard";

function Home({ cart, onAddToCart, onIncrease, onDecrease }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("iPhone");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["iPhone", "OPPO", "Realme"];

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Unable to load products"))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const brand = product.brand?.toLowerCase() || "";
    const title = product.title.toLowerCase();

    if (category === "iPhone") {
      return brand.includes("apple") || title.includes("iphone");
    }

    if (category === "OPPO") {
      return brand.includes("oppo") || title.includes("oppo");
    }

    if (category === "Realme") {
      return brand.includes("realme") || title.includes("realme");
    }

    return false;
  });

  return (
    <div className="page">
      <section className="banner">
        <h1>Welcome to MobileMart</h1>
        <p>Your favourite mobiles at the best prices</p>
      </section>

      <h2>Categories</h2>

      <div className="categories">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <h2>{category} Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p>No products available for this category.</p>
      )}

      <div className="products">
        {filteredProducts.map((product) => {
          const cartItem = cart.find(
            (item) => item.id === product.id
          );

          return (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cartItem?.quantity || 0}
              onAddToCart={onAddToCart}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
