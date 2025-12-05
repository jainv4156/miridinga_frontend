import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.mridangas.com/api/products/products/${id}/`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <main className="px-6 md:px-12 lg:px-24 xl:px-40 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT — IMAGE */}
        <div className="flex flex-col gap-4">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{ backgroundImage: `url(${product.photo})` }}
          ></div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-black">{product.product_name}</h1>

          <p className="text-gray-500">{product.description || "Awesome product!"}</p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500">{product.rating || 4.5} ⭐</span>
            <span className="text-gray-500">
              ({product.reviews_count || 1245} reviews)
            </span>
          </div>

          <div className="text-4xl font-bold">₹{product.final_price}</div>
          <div className="text-gray-500 line-through">₹{product.price}</div>

          <button className="mt-4 bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary/90">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
