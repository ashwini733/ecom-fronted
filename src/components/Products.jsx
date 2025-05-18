import React, { useEffect, useState } from "react";
import ProductCard from "./Productcard";

const Products = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/`
        );
        const data = await response.json(); // convert json to object
        setProducts(data);
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };
    fetchData();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="products-container">
      <h3 className="products-heading">Products Page</h3>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
