import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart,} = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const placeOrder = async () => {
    const user = JSON.parse(
  localStorage.getItem("dkUser")
);
console.log({
  products: cartItems,
  totalPrice,
  userEmail: user?.email,
});
  try {
    const response = await fetch(
      "https://dk-seed-store-backend.onrender.com/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          products: cartItems,
          totalPrice,
           userEmail: user?.email,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Order Placed Successfully ✅");

    clearCart();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "50px" }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
                style={{
                  borderRadius: "10px",
                }}
              />

              <div>
                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "30px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2e7d32",
            }}
          >
            Total: ₹{totalPrice}
          </div>

          <button
  onClick={placeOrder}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Place Order
</button>
        </>
      )}
    </div>
  );
}

export default Cart;