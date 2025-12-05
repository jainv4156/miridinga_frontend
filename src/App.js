import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import AuthPage from './AuthPage';
import Cart from './Cart';
import Header from './Header';
import Carousel from './Carousel';
import CategoryGrid from './CategoryGrid';
import DealsSection from './DealsSection';
import ProductDetails from './ProductDetails';
import Footer from './Footer';

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const [lastCartItem, setLastCartItem] = useState(null);
  const [selectedType, setSelectedType] = useState('All');

  // ------------------ LOAD CART COUNT ------------------
  useEffect(() => {
    if (!user || !accessToken) {
      setCartCount(0);
      return;
    }
    fetch("https://api.mridangas.com/api/products/cart/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        let items = Array.isArray(data) ? data : (data?.results || []);
        setCartCount(items.length);
      })
      .catch(() => setCartCount(0));
  }, [user, accessToken]);

  // ------------------ LOGIN HANDLERS ------------------
  const handleLogin = (data) => {
    setAccessToken(data.access);
    setUser({ logged_in: true });
    navigate("/"); // redirect to homepage
  };

  const handleRegister = (data) => {
    setAccessToken(data.access);
    setUser({ logged_in: true });
    navigate("/");
  };

  const handleLogout = () => {
    if (!accessToken) {
      setUser(null);
      setAccessToken(null);
      setCartCount(0);
      return;
    }

    fetch("https://api.mridangas.com/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .finally(() => {
        setUser(null);
        setAccessToken(null);
        setCartCount(0);
        navigate("/");
      });
  };

  // ------------------ CART HANDLER ------------------
  const handleAddToCart = (product, response) => {
    setLastCartItem({ ...response, productDetails: product });
    setCartCount(prev => prev + 1);
  };

  // ------------------ HOME PAGE SECTION ------------------
  const HomePage = () => (
    <main className="flex flex-1 justify-center py-5 sm:py-8 lg:py-10">
      <div className="layout-content-container flex flex-col max-w-7xl flex-1 px-4 sm:px-10 lg:px-20 gap-8 w-full">
        <Carousel />
        <CategoryGrid onTypeSelect={setSelectedType} />
        <DealsSection
          user={user}
          accessToken={accessToken}
          selectedType={selectedType}
          onAddToCart={handleAddToCart}
          onRequireLogin={() => navigate("/login")}
        />
      </div>
    </main>
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <Header
        onSignInClick={() => navigate("/login")}
        onCartClick={() => navigate("/cart")}
        user={user}
        onLogout={handleLogout}
        cartCount={cartCount}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <AuthPage mode="login" onLogin={handleLogin} />
          }
        />

        <Route
          path="/signup"
          element={
            <AuthPage mode="register" onRegister={handleRegister} />
          }
        />


        <Route path="/product/:id" element={<ProductDetails />} />
        

        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              accessToken={accessToken}
              lastCartItem={lastCartItem}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
