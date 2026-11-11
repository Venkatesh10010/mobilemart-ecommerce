
function ProductCard({
  product,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease
}) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>

      <p className="price">₹{product.price}</p>

      {quantity === 0 ? (
        <button onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      ) : (
        <div className="home-quantity">
          <button onClick={() => onDecrease(product.id)}>
            -
          </button>

          <span>{quantity}</span>

          <button onClick={() => onIncrease(product.id)}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
