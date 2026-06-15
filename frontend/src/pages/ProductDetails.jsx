import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
    <div
      style={{
        padding: "50px",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "400px",
          borderRadius: "15px",
        }}
      />

      <h1>{product.name}</h1>

      <h2>₹{product.price}</h2>

      <p>
        Premium quality {product.name}
        with high germination rate.
      </p>

      <button
        onClick={() =>
          addToCart(product)
        }
        style={{
          padding: "12px 25px",
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetails;