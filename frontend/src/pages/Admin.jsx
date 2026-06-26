import { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] =
  useState(null);

  const fetchProducts = async () => {
  try {
    const response = await fetch(
      "https://dk-seed-store-backend.onrender.com/api/products"
    );

    const data = await response.json();

    setProducts(data);
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async () => {
  if (!imageFile) return image;

  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append(
    "upload_preset",
    "dk_seed_store"
  );

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dsbgtqmst/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    console.log(error);
    return "";
  }
};

  const handleSubmit = async () => {
    if (!imageFile) {
  alert("Please select an image");
  return;
}
    const imageUrl = await uploadImage();
  try {
    const response = await fetch(
      "https://dk-seed-store-backend.onrender.com/api/products",
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
          image:imageUrl,
          rating,
          discount,
        stock: Number(stock),
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
    setStock("");
    setImageFile(null);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    await fetch(
      `https://dk-seed-store-backend.onrender.com/api/products/${id}`,
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
  const imageUrl = imageFile
  ? await uploadImage()
  : image;
  try {
    await fetch(
      `https://dk-seed-store-backend.onrender.com/api/products/${editingId}`,
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
          image:imageUrl,
          rating,
          discount,
        stock: Number(stock),
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
    setStock("");
    setImageFile(null);
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
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImageFile(e.target.files[0])
  }
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

      <input
  type="number"
  placeholder="Stock"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
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
          setStock(product.stock);
          setImageFile(null);
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