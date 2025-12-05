import React, { useEffect, useState } from "react";

function Cart({ accessToken, lastCartItem, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    fetch("https://api.mridangas.com/api/products/cart/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.results || [];
        setCartItems(items);
      })
      .finally(() => setLoading(false));
  }, [accessToken]);

  const displayItems =
    cartItems.length > 0 ? cartItems : lastCartItem ? [lastCartItem] : [];

  const totalPrice = displayItems.reduce(
    (sum, item) => sum + (item.total_price || 0),
    0
  );
  const discount = 0;
  const delivery = 0;
  const finalAmount = totalPrice - discount + delivery;

  const getDiscountPercent = (price, finalPrice) => {
    if (!price || !finalPrice) return 0;
    return Math.round(((price - finalPrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-background-light font-display">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text-light-primary">
            My Cart ({displayItems.length})
          </h1>
          <button
            onClick={onClose}
            className="text-text-light-secondary hover:text-primary text-xl"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading cart...</div>
        ) : displayItems.length === 0 ? (
          <div className="text-center py-12 text-text-light-secondary">
            Your cart is empty
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-surface-light p-6 rounded-sm shadow-sm">
              <ul>
                {displayItems.map((item, idx) => {
                  const quantity = item.quantity || 1;
                  const totalPriceItem = quantity * item.product?.final_price;
                  return (
                    <li
                      key={idx}
                      className="flex flex-col sm:flex-row items-start py-6 border-b border-border-light"
                    >
                      <img
                        src={item.product?.photo || "https://via.placeholder.com/150"}
                        alt={item.product?.product_name || "Product"}
                        className="w-32 h-32 object-cover rounded mr-6 mb-4 sm:mb-0"
                      />
                      <div className="flex-grow">
                        <h2 className="font-semibold text-lg text-text-light-primary">
                          {item.product?.product_name || "Product"}
                        </h2>

                        <div className="flex items-center mt-4">
                          <div className="flex items-center border border-border-light rounded">
                            <button className="px-3 py-1 text-lg font-bold text-text-light-secondary">
                              -
                            </button>
                            <input
                              className="w-12 text-center border-l border-r border-border-light bg-transparent text-text-light-primary focus:outline-none"
                              type="text"
                              readOnly
                              value={quantity}
                            />
                            <button className="px-3 py-1 text-lg font-bold text-primary">
                              +
                            </button>
                          </div>
                          <button className="ml-6 font-semibold text-text-light-secondary hover:text-red-500 transition-colors">
                            REMOVE
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:ml-6 text-left sm:text-right">
                        {/* Total price for item */}
                        <p className="text-xl font-bold text-text-light-primary">
                          ₹{totalPriceItem}
                        </p>

                        {/* Discount details under total price */}
                        {item.product?.price &&
                          item.product?.final_price &&
                          item.product.price > item.product.final_price && (
                            <div className="flex items-center gap-2 mt-1 justify-end">
                              <p className="text-sm text-text-light-secondary line-through">
                                ₹{item.product.price * quantity}
                              </p>
                              <p className="text-sm text-green-600 font-medium">
                                {getDiscountPercent(
                                  item.product.price,
                                  item.product.final_price
                                )}
                                % Off
                              </p>
                            </div>
                          )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-surface-light p-6 rounded-sm shadow-sm sticky top-24">
                <h2 className="text-lg font-semibold text-text-light-secondary border-b border-border-light pb-4 mb-4">
                  PRICE DETAILS
                </h2>
                <div className="space-y-4 text-text-light-primary">
                  <div className="flex justify-between">
                    <span>Price ({displayItems.length} items)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600">-₹{discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-border-light my-4"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-green-600 mt-4">
                  You will save ₹{discount} on this order
                </p>
                <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded mt-6 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
