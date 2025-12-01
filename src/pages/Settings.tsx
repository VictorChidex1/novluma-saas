import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  User,
  Mail,
  Save,
  Loader2,
  Lock,
  Shield,
  Smartphone,
  Laptop,
} from "lucide-react";

export function Settings() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isGoogleUser = user?.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    setMessage(null);

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage(null);

    try {
      await updatePassword(auth.currentUser, newPassword);
      setPasswordMessage({
        type: "success",
        text: "Password updated successfully!",
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error);
      if (error.code === "auth/requires-recent-login") {
        setPasswordMessage({
          type: "error",
          text: "Please log out and log back in to change your password.",
        });
      } else {
        setPasswordMessage({
          type: "error",
          text: error.message || "Failed to update password.",
        });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Information
            </h2>
            <p className="text-sm text-gray-500">
              Update your account's profile information and email address.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
            {/* Display Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Display Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email Input (Read Only) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 sm:text-sm cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Email address cannot be changed.
              </p>
            </div>

            {/* Message Alert */}
            {message && (
              <div
                className={`p-4 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Account Security
            </h2>
            <p className="text-sm text-gray-500">
              Manage your password and security preferences.
            </p>
          </div>

          <div className="p-6 space-y-8">
            {/* Change Password */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={16} className="text-gray-500" />
                Change Password
              </h3>

              {isGoogleUser ? (
                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
                  You are signed in with Google. Please manage your password and
                  security settings in your Google Account.
                </div>
              ) : (
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-4 max-w-md"
                >
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>

                  {passwordMessage && (
                    <div
                      className={`text-sm ${
                        passwordMessage.type === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="text-sm bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* 2FA (Visual Only) */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Shield size={16} className="text-gray-500" />
                  Two-Factor Authentication
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400">
                  Disabled
                </span>
                <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 bg-gray-200">
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Active Sessions (Visual Only) */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Smartphone size={16} className="text-gray-500" />
                Active Sessions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Laptop size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Mac OS • Chrome
                      </p>
                      <p className="text-xs text-green-600 font-medium">
                        Current Session
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
