import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser =
    JSON.parse(localStorage.getItem("dkUser"));

  setUser(storedUser);
}, []);

const handleLogout = () => {
  localStorage.removeItem("dkUser");

  window.location.href = "/";
};

  return (
    <nav className="navbar">

      <h2>🌱 DK Seed Store</h2>

      <ul>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        </li>

       {user?.isAdmin && (
  <>
    <li>
      <Link to="/dashboard">
        Dashboard
      </Link>
    </li>

    <li>
      <Link to="/orders">
        Orders
      </Link>
    </li>
  </>
)}

        <li>
  <Link to="/order-history">
    My Orders
  </Link>
</li>

      </ul>

   {user ? (
 <div className="user-info"
>
  <h3>
    Hello, {user.name || user.email} 👋
  </h3>

  <button onClick={handleLogout}
   style={{
        background: "red",
        color: "white",
        border: "none",
        padding: "8px 15px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
  >
    Logout
  </button>
</div>
) : (
  <Link to="/login">
    <button>Login</button>
  </Link>
)}

    </nav>
  );
}

export default Navbar;