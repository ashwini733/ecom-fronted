import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ProductCard = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      setIsFavorite(true);
      alert("Product added to favorites!");
    } catch (error) {
      console.error("Favorite error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <Link to={`/product/${product._id}`} className="card-link">
        <img src={product.image} alt={product.title} className="card-image" />
        <h4 className="card-title">{product.title}</h4>
        <p className="card-description">{product.description}</p>
        <p className="card-price">Price: ${product.price}</p>
        <p className="card-rating">
          ⭐ {product.rating.rate} ({product.rating.count})
        </p>
        <p className="card-theme">Theme : {theme}</p>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product._id)}
        className="btn-wishlist"
        style={{
          backgroundColor: "transparent",
          color: isFavorite ? "red" : "gray",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        {isFavorite ? "♥" : "♡"} Favorite
      </button>
    </div>
  );
};

export default ProductCard;
