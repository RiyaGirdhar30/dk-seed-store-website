import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

 const user = {
  name,
  email,
};

localStorage.setItem(
  "dkUser",
  JSON.stringify(user)
);

alert("Signup Successful");
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
          width: "450px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2e7d32",
            marginBottom: "20px",
          }}
        >
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
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
          placeholder="Password"
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
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
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;