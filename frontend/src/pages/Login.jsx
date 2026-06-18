import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
  email === "admin@dkseed.com" &&
  password !== "dk123"
) {
  alert("Invalid Admin Password");
  return;
}

const isAdmin =
  email === "admin@dkseed.com" &&
  password === "dk123";

const user = {
  email,
  isAdmin,
};

localStorage.setItem(
  "dkUser",
  JSON.stringify(user)
);

alert("Login Successful");
navigate("/");
window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#2e7d32",
          }}
        >
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
  style={{
    marginTop: "15px",
    textAlign: "center",
  }}
>
  Don't have an account?

  <Link to="/signup">
    Sign Up
  </Link>
</p>

      </form>
    </div>
  );
}

export default Login;