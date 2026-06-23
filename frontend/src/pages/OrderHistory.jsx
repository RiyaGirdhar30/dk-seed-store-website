import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("dkUser")
  );
console.log(user);
  fetch(
    "https://dk-seed-store-backend.onrender.com/api/orders"
  )
    .then((res) => res.json())
    .then((data) => {

      const userOrders =
        data.filter(
          (order) =>
            order.userEmail ===
            user?.email
        );

      setOrders(userOrders);
    })
    .catch((error) => {
      console.log(error);
    });

}, []);

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>
              Order ID:
              {order._id.slice(-6)}
            </h3>

            <p>
              Total: ₹{order.totalPrice}
            </p>

           <p>
  Status:

  <span
    style={{
      marginLeft: "10px",
      padding: "5px 12px",
      borderRadius: "20px",
      color: "white",
      backgroundColor:
        order.status === "Pending"
          ? "orange"
          : order.status === "Packed"
          ? "blue"
          : order.status === "Shipped"
          ? "purple"
          : "green",
    }}
  >
    {order.status}
  </span>
</p>

            <p>
              Date:
              {new Date(
                order.orderDate
              ).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;