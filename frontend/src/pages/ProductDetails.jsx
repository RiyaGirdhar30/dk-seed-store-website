import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "../styles/ProductDetails.css";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } =
    useContext(CartContext);

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetch(
      `https://dk-seed-store-backend.onrender.com/api/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (

  <div className="product-details">

  <img
  className="product-image"
  src={product.image}
  alt={product.name}
/>

      <h1>{product.name}</h1>

      <h2>₹{product.price}</h2>

      {product.stock > 5 ? (
  <p
    style={{
      color: "green",
      fontWeight: "bold",
    }}
  >
    ✅ In Stock
  </p>
) : product.stock > 0 ? (
  <p
    style={{
      color: "orange",
      fontWeight: "bold",
    }}
  >
    ⚠️ Only {product.stock} left in stock
  </p>
) : (
  <p
    style={{
      color: "red",
      fontWeight: "bold",
    }}
  >
    ❌ Out of Stock
  </p>
)}

      <p>
        Premium quality {product.name}
        with high germination rate.
      </p>

<button
  className="cart-btn"
  onClick={() => addToCart(product)}
  disabled={product.stock === 0}
  style={{
    background:
      product.stock === 0
        ? "gray"
        : "#2e7d32",
    cursor:
      product.stock === 0
        ? "not-allowed"
        : "pointer",
  }}
>
  
  {product.stock === 0
    ? "Out of Stock"
    : "Add To Cart"}
</button>

    </div>
  );
}

export default ProductDetails;