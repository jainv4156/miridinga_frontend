import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './logo.jpg'; // Place your logo.jpg in src folder (or replace with logo.svg)
import userIcon from './user.svg';
import cartIcon from './cart.svg';

function Navbar({ onSignInClick, onCartClick, onTypeSelect, user, onLogout, cartCount }) {
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch('https://api.mridangas.com/api/products/product-types/')
      .then(res => res.json())
      .then(data => setProductTypes(data))
      .catch(() => setProductTypes([]));
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    if (onTypeSelect) onTypeSelect(type);
  };

  const handleProfileClick = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <input type="text" className="navbar-search" placeholder="Search products..." />
        <div className="navbar-types">
          <button
            className={selectedType === 'All' ? 'type-btn selected' : 'type-btn'}
            onClick={() => handleTypeClick('All')}
          >
            All
          </button>
          {productTypes.map(type => (
            <button
              key={type.type_id}
              className={selectedType === type.type_id ? 'type-btn selected' : 'type-btn'}
              onClick={() => handleTypeClick(type.type_id)}
            >
              {type.type_name}
            </button>
          ))}
        </div>
      </div>
      <div className="navbar-right">
        {user ? (
          <div style={{ position: 'relative' }}>
            <button className="navbar-icon logged-in profile-btn" onClick={handleProfileClick} title="Profile">
              <img src={userIcon} alt="user" className="icon-img" />
            </button>
            {showMenu && (
              <div className="profile-menu">
                <button onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="navbar-icon" onClick={onSignInClick} title="Sign In">
            <img src={userIcon} alt="sign in" className="icon-img" />
          </button>
        )}
        <button className="navbar-icon" onClick={onCartClick} title="Cart" style={{ position: 'relative' }}>
          <img src={cartIcon} alt="cart" className="icon-img" />
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
