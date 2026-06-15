import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://dk-seed-store-backend.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateStatus = async (
  orderId,
  newStatus
) => {
  try {
    await fetch(
      `https://dk-seed-store-backend.onrender.com/api/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const response = await fetch(
      "https://dk-seed-store-backend.onrender.com/api/orders"
    );

    const data =
      await response.json();

    setOrders(data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>All Orders</h1>

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
              Total:
              ₹{order.totalPrice}
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

            <h4>Products:</h4>

            <select
  value={order.status}
  onChange={(e) =>
    updateStatus(
      order._id,
      e.target.value
    )
  }
  style={{
    marginBottom: "15px",
    padding: "8px",
  }}
>
  <option value="Pending">
    Pending
  </option>

  <option value="Packed">
    Packed
  </option>

  <option value="Shipped">
    Shipped
  </option>

  <option value="Delivered">
    Delivered
  </option>
</select>

            {order.products.map(
              (product, index) => (
                <p key={index}>
                  • {product.name} -
                  ₹{product.price}
                </p>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;