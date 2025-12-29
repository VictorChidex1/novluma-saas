import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Check your inbox for password reset instructions.");
    } catch (err: any) {
      console.error("Auth Error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError(err.message || "Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <Link to="/" className="inline-block mb-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Novluma
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email to receive reset instructions
          </p>
        </div>

        <div className="p-8 pt-0">
          {message ? (
            <div className="text-center">
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm">
                {message}
              </div>
              <Link
                to="/login"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
