import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-gray-900">
              <div className="size-7 text-primary font-bold">🛍️</div>
              <h1 className="text-lg font-bold tracking-tight">Mridanga</h1>
            </div>
            <p className="mt-4 text-sm">The one-stop shop for all your needs. Delivering happiness to your doorstep.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Information</h3>
            <ul className="mt-4 space-y-2">
              <li><a className="text-sm hover:text-primary transition-colors" href="/">About Us</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Careers</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Press Releases</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Help</h3>
            <ul className="mt-4 space-y-2">
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Payments</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Shipping</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">FAQ</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Policies</h3>
            <ul className="mt-4 space-y-2">
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Return Policy</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Terms of Use</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Security</a></li>
              <li><a className="text-sm hover:text-primary transition-colors" href="/">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Subscribe</h3>
            <p className="mt-4 text-sm">Get the latest deals and offers directly in your inbox.</p>
            <form className="mt-4 flex">
              <input
                className="flex-1 min-w-0 rounded-l-md border border-gray-300 bg-white focus:ring-primary focus:border-primary px-3 py-2"
                placeholder="Enter your email"
                type="email"
              />
              <button className="px-4 py-2 bg-primary text-white font-semibold rounded-r-md hover:bg-primary/90" type="submit">
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 Mridanga. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 md:mt-0">
            <a className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors" href="tel:+919205713551" title="Call +91 9205713551" aria-label="Call +91 9205713551">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 9205713551
            </a>
            <a className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors" href="tel:+919311020756" title="Call +91 9311020756" aria-label="Call +91 9311020756">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 9311020756
            </a>
            <a className="hover:text-primary transition-colors" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a className="hover:text-primary transition-colors" href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
