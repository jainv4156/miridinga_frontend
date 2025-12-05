import React from 'react';
import userIcon from './user.svg';
import cartIcon from './cart.svg';
import { Link } from "react-router";
import logo from "./assets/logo.png"; 

function Header({ onSignInClick, onCartClick, user, onLogout, cartCount }) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap border-b border-solid border-gray-200 px-4 sm:px-10 lg:px-20 py-3 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 cursor-pointer hover:opacity-80 transition"
          >
            {/* <div className="size-8 text-primary font-bold">🛍️</div> */}
            <div className="flex items-center justify-center h-10 w-25 overflow-hidden rounded-l ml-20 ">
              <img 
                src={logo}
                alt='Mridanga Logo'
                className='h-20 w-auto object-cover'
              >
              </img>
            {/* <h1 className="text-xl font-bold tracking-tight">Mridangas</h1> */}
            </div>
          </Link>

        </div>

        <div className="flex flex-1 justify-end items-center gap-4">
          <label className="flex-1 flex-col !h-10 max-w-sm hidden md:flex">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-gray-500 flex bg-gray-100 items-center justify-center pl-4 rounded-l-lg">
                <span>🔍</span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Search for products, brands and more"
              />
            </div>
          </label>

          <div className="flex items-center gap-2">
            <button onClick={onSignInClick} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
              {user ? 'Account' : 'Login'}
            </button>
            <button
              onClick={onCartClick}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-gray-100 text-gray-800 gap-2 text-sm font-bold min-w-0 px-2.5 hover:bg-gray-200 transition-colors relative"
            >
              <img src={cartIcon} alt="cart" className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-gray-100 text-gray-800 gap-2 text-sm font-bold min-w-0 px-2.5 hover:bg-gray-200 transition-colors"
              >
                <img src={userIcon} alt="user" className="w-5 h-5" />
              </button>
              {showMenu && user && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
              {showMenu && !user && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={onSignInClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
