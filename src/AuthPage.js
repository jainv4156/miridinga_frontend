import { useState } from "react";

export default function AuthPage({ modeProp = "signin", onLogin, onRegister, onClose }) {
  const [mode, setMode] = useState(modeProp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signin") {
        const res = await fetch("https://api.mridangas.com/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.detail || "Invalid credentials");

        onLogin && onLogin(data);          // ⬅ send data back to App.js
      } 
      else {
        const res = await fetch("https://api.mridangas.com/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.detail || "Registration failed");

        onRegister && onRegister(data);    // ⬅ send data back to App.js
      }

      onClose && onClose();
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#0d121b] dark:text-white min-h-screen flex items-center justify-center p-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl rounded-xl bg-white dark:bg-background-dark/50 shadow-lg md:grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:flex bg-gray-900 p-8">
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwCQY7U7g0X8zq82wWHg8eF1LtdL1wQaVAKytgh6KjJWja1AASpd6x7zIiU6EhHzLtMmd9h6QfzRCdm6B8QKCuUjdE0EwhBc07PI5KJWfsBxwgELdHUExlSaCg5xzs7l4OAbMOmKlLW3y-zOwX7MkMEVFB42iJvSRZSn1CwLcLlqcmFNoHIl_3KlAEa5JJZaknHRNLuMQrnT8fKKOM6OcVT_ZsOtk-h052pqNCIhBTqu7iS0O3oeLnNf_dBWwSmJFE2a2p13c8Etc"
            alt=""
          />

          <div className="relative text-white">
            <h2 className="text-3xl font-bold">Welcome!</h2>
            <p className="mt-2 text-gray-300">
              Sign in to continue your shopping journey.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="max-w-md mx-auto">

            {/* MODE TOGGLE */}
            <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
              <button
                onClick={() => setMode("signin")}
                className={`h-10 flex-1 text-sm rounded-lg ${
                  mode === "signin"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Sign In
              </button>

              <button
                onClick={() => setMode("signup")}
                className={`h-10 flex-1 text-sm rounded-lg ${
                  mode === "signup"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* TITLE */}
            <h1 className="text-2xl font-bold text-center mt-8">
              {mode === "signin" ? "Welcome Back" : "Create an Account"}
            </h1>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-center mt-4 text-sm">{error}</p>
            )}

            {/* FORM */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <label className="flex flex-col">
                <p className="text-sm font-medium pb-2">Email</p>
                <input
                  type="email"
                  required
                  className="rounded-lg h-12 px-4 border"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{"color":"black"}}
                />
              </label>

              {/* Password */}
              <label className="flex flex-col">
                <p className="text-sm font-medium pb-2">Password</p>
                <input
                  type="password"
                  required
                  className="rounded-lg h-12 px-4 border"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{"color":"black"}}
                />
              </label>

              {/* Submit Button */}
              <button
                disabled={loading}
                className="w-full h-12 rounded-lg bg-primary text-white flex items-center justify-center"
              >
                {loading ? "Processing..." : mode === "signin" ? "Sign In" : "Sign Up"}
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-4 text-sm text-center text-gray-600 hover:underline"
              >
                Close
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
