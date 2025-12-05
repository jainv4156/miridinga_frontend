import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function DealsSection({ user, accessToken, selectedType, onAddToCart, onRequireLogin }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.mridangas.com/api/products/products/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const filteredProducts = selectedType === 'All'
    ? products
    : products.filter(product => product.product_type === selectedType);

  const handleAddToCart = (product) => {
    if (!user) {
      onRequireLogin();
      return;
    }
    if (!accessToken) return;

    const payload = {
      product: product.id,
      quantity: 1,
      size: product.size || 'Standard'
    };

    fetch('https://api.mridangas.com/api/products/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        const text = await res.text();   // Get raw response
        console.log("RAW RESPONSE:", text);

        try {
          const data = JSON.parse(text); // Try to parse
          onAddToCart(product, data);
        } catch (e) {
          console.error("JSON parse failed:", e);
        }
      })
      .catch(err => console.error('Add to cart error:', err));
  };

  const getRandomImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1498049860654-af1a5e566b47?w=500&h=500&fit=crop',
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const getDiscountPercent = (price, finalPrice) => {
    if (!price || !finalPrice) return 0;
    return Math.round(((price - finalPrice) / price) * 100);
  };

  return (
    <section>
      <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
        Deals of the Day
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">

        {filteredProducts.map((product) => (

          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">

            {/* ✅ FIXED: Proper clickable link */}
            <Link to={`/product/${product.id}`} className="block group">

              <div
                className="bg-cover bg-center w-full aspect-square"
                style={{
                  backgroundImage: `url(${product.photo || getRandomImage()})`
                }}
              ></div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{product.product_name}</h3>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500 text-sm">
                    {product.rating ? `${product.rating} ⭐` : '4.5 ⭐'}
                  </span>
                  <span className="text-gray-500 text-sm">({product.reviews_count || 1245})</span>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-lg font-bold text-gray-900">₹{product.final_price}</p>
                  <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                  <p className="text-sm font-semibold text-green-600">
                    {getDiscountPercent(product.price, product.final_price)}% off
                  </p>
                </div>
              </div>
            </Link>

            {/* ❗ FIXED: Add to cart moved OUTSIDE link */}
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-primary text-white font-semibold py-2 rounded-b-lg hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>
    </section>
  );
}

export default DealsSection;
