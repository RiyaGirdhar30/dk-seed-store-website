import "../styles/FeaturedProducts.css";

function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Bajra Seeds",
      price: "₹500",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500"
    },
    {
      id: 2,
      name: "Wheat Seeds",
      price: "₹650",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500"
    },
    {
      id: 3,
      name: "Maize Seeds",
      price: "₹700",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500"
    },
    {
      id: 4,
      name: "Vegetable Seeds",
      price: "₹450",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500"
    }
  ];

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.price}</p>

            <button>Add To Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;