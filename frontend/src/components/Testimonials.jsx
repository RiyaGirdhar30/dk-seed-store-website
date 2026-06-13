import "../styles/Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      review: "Excellent seed quality and timely delivery. Highly recommended!"
    },
    {
      id: 2,
      name: "Amit Singh",
      review: "The germination rate was very good. Will order again."
    },
    {
      id: 3,
      name: "Sandeep Sharma",
      review: "Affordable prices and great customer support."
    }
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>

      <div className="testimonial-container">
        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <h3>⭐⭐⭐⭐⭐</h3>
            <p>"{review.review}"</p>
            <h4>- {review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;