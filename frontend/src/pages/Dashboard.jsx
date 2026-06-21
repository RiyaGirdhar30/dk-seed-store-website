import { useEffect, useState } from "react";

function Dashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetch(
      "https://dk-seed-store-backend.onrender.com/api/orders/dashboard"
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
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
      <h1>Admin Dashboard 📊</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div
          style={{
            background: "#4caf50",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>📦 Products</h2>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div
          style={{
            background: "#2196f3",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>🛒 Orders</h2>
          <h1>{stats.totalOrders}</h1>
        </div>

        <div
          style={{
            background: "#ff9800",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>⏳ Pending</h2>
          <h1>{stats.pendingOrders}</h1>
        </div>

        <div
          style={{
            background: "#9c27b0",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>💰 Revenue</h2>
          <h1>₹{stats.totalRevenue}</h1>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;