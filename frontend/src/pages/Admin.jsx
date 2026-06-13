import { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const [editingId, setEditingId] =
  useState(null);

  const fetchProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:7000/api/products"
    );

    const data = await response.json();

    setProducts(data);
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async () => {
  try {
    const response = await fetch(
      "http://localhost:7000/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          category,
          image,
          rating,
          discount,
          stock: "In Stock",
        }),
      }
    );

    const data = await response.json();

    alert("Product Added Successfully ✅");

    fetchProducts();

    console.log(data);

    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setRating("");
    setDiscount("");
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    await fetch(
      `http://localhost:7000/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    alert("Product Deleted ✅");

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async () => {
  try {
    await fetch(
      `http://localhost:7000/api/products/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          category,
          image,
          rating,
          discount,
          stock: "In Stock",
        }),
      }
    );

    alert("Product Updated ✅");

    setEditingId(null);

    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setRating("");
    setDiscount("");

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchProducts();
}, []);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      <br /><br />

      {editingId ? (
  <button onClick={updateProduct}>
    Update Product
  </button>
) : (
  <button onClick={handleSubmit}>
    Add Product
  </button>
)}

      <hr />

<h2>All Products</h2>

{products.map((product) => (
  <div
    key={product._id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #ddd",
    }}
  >
    <span>
      {product.name} - ₹{product.price}
    </span>

    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <button
        onClick={() => {
          setEditingId(product._id);

          setName(product.name);
          setPrice(product.price);
          setCategory(product.category);
          setImage(product.image);
          setRating(product.rating);
          setDiscount(product.discount);
        }}
      >
        Edit
      </button>

      <button
        onClick={() =>
          deleteProduct(product._id)
        }
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  </div>
))}
    </div>
  );
}

export default Admin;