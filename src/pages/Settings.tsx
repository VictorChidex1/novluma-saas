import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";
import { updateProfile, updatePassword, deleteUser } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import {
  Save,
  Loader2,
  AlertTriangle,
  FileText,
  Download,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Contact Info State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");
  const [language, setLanguage] = useState("en");

  // Notification Settings State
  const [emailProductUpdates, setEmailProductUpdates] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [emailBilling, setEmailBilling] = useState(true);
  const [pushNewComments, setPushNewComments] = useState(true);
  const [pushProjectInvites, setPushProjectInvites] = useState(true);

  // Billing State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState("");

  // Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Delete Account State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isGoogleUser = user?.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  // Fetch user data from Firestore on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
            if (data.timeZone) setTimeZone(data.timeZone);
            if (data.language) setLanguage(data.language);

            // Notifications
            if (data.emailProductUpdates !== undefined)
              setEmailProductUpdates(data.emailProductUpdates);
            if (data.emailMarketing !== undefined)
              setEmailMarketing(data.emailMarketing);
            if (data.emailBilling !== undefined)
              setEmailBilling(data.emailBilling);
            if (data.pushNewComments !== undefined)
              setPushNewComments(data.pushNewComments);
            if (data.pushProjectInvites !== undefined)
              setPushProjectInvites(data.pushProjectInvites);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    setMessage(null);

    try {
      // 1. Update Auth Profile (Display Name)
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      // 2. Update Firestore Document (Contact Info & Notifications)
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        displayName: displayName, // Keep sync
        phoneNumber: phoneNumber,
        timeZone: timeZone,
        language: language,
        emailProductUpdates: emailProductUpdates,
        emailMarketing: emailMarketing,
        emailBilling: emailBilling,
        pushNewComments: pushNewComments,
        pushProjectInvites: pushProjectInvites,
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

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      await deleteUser(auth.currentUser);
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/requires-recent-login") {
        setDeleteError(
          "Security check: Please log out and log back in to delete your account."
        );
      } else {
        setDeleteError(
          "Failed to delete account. Please try again or contact support."
        );
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Theme */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {user?.displayName?.[0] || "U"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {user?.displayName || "User"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Theme Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Appearance
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { mode: "light" as const, icon: Sun, label: "Light" },
                  { mode: "dark" as const, icon: Moon, label: "Dark" },
                  { mode: "system" as const, icon: Laptop, label: "System" },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      theme === mode
                        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm ring-2 ring-indigo-500/20"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - All Settings Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Profile Information
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time Zone
                    </label>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    >
                      <option value="UTC">UTC</option>
                      <option value="PST">PST</option>
                      <option value="EST">EST</option>
                      <option value="GMT">GMT</option>
                      <option value="CET">CET</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                {message && (
                  <p
                    className={`text-sm ${
                      message.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
              </form>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Notifications
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailProductUpdates}
                    onChange={(e) => setEmailProductUpdates(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Product Updates
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailMarketing}
                    onChange={(e) => setEmailMarketing(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Marketing & Newsletter
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailBilling}
                    onChange={(e) => setEmailBilling(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Billing Reminders
                  </span>
                </label>
              </div>
            </div>

            {/* Billing & Subscription */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Billing & Subscription
              </h2>
              <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 mb-6">
                <div>
                  <p className="text-sm font-medium text-indigo-900 dark:text-indigo-300">
                    Current Plan
                  </p>
                  <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                    Pro Plan
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400/80 mt-1">
                    $29/month • Renews on Dec 15, 2025
                  </p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Upgrade
                </button>
              </div>

              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                Invoice History
              </h3>
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {[1, 2, 3].map((_, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          Nov 15, 2025
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          $29.00
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 flex items-center justify-end gap-1 w-full">
                            <Download size={14} /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="text-sm text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Account Security
              </h2>

              {isGoogleUser ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-lg text-sm">
                  You are signed in with Google. Please manage your password and
                  security settings in your Google Account.
                </div>
              ) : (
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-4 max-w-md"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  {passwordMessage && (
                    <div
                      className={`text-sm ${
                        passwordMessage.type === "success"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {passwordMessage.text}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              )}
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                  <AlertTriangle size={20} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Danger Zone
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Permanently delete your account and all of your content. This
                  action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Delete Account
                </button>

                {/* Delete Confirmation Modal/Area */}
                {showDeleteConfirm && (
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-sm font-bold text-red-900 dark:text-red-400 mb-2">
                      Are you absolutely sure?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {deleteLoading
                          ? "Deleting..."
                          : "Yes, delete my account"}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={deleteLoading}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                    {deleteError && (
                      <p className="text-xs text-red-600 mt-3">{deleteError}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in-95 border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Cancel Subscription?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              We're sorry to see you go. If you cancel, you'll lose access to
              Pro features at the end of your billing period.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Why are you leaving? (Optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                rows={3}
                placeholder="Tell us how we can improve..."
                value={cancelFeedback}
                onChange={(e) => setCancelFeedback(e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  alert("Subscription cancellation requested.");
                }}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
