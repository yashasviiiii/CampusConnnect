import React, { useState } from "react";
import SimpleSwitch from "../ui/SimpleSwitch";
import { updateProfile } from "../../utils/updateProfile";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

const Settings: React.FC = () => {
  const { user, profile } = useAuth();

  const [name, setName] = useState(profile?.name || "");
  const [rollNumber, setRollNumber] = useState(profile?.college_id || "");
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      if (!user) return;
      await updateProfile(user.id, name, rollNumber);
      alert("✅ Profile updated successfully.");
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
  if (!newPassword || newPassword.length < 6) {
    alert("⚠️ Password must be at least 6 characters long.");
    return;
  }

  try {
    setPasswordUpdating(true);

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Password update error:", error.message);
      alert("❌ Failed to update password: " + error.message);
    } else {
      alert("✅ Password updated successfully.");
      setNewPassword("");
    }
  } catch (err) {
    console.error("Unexpected error updating password:", err);
    alert("❌ An unexpected error occurred.");
  } finally {
    setPasswordUpdating(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Profile Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">👤 Profile Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
            <input
              type="text"
              value={profile?.college_name || ""}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        <button
          onClick={handleProfileUpdate}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Save Changes
        </button>
      </section>

      {/* Privacy & Security */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🔐 Privacy & Security</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              onClick={handleChangePassword}
              disabled={passwordUpdating}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition disabled:opacity-50"
            >
              {passwordUpdating ? "Updating..." : "Update Password"}
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                  // Handle delete logic here
                }
              }}
              className="text-red-600 hover:underline font-medium"
            >
              🗑️ Delete My Account
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🔔 Notification Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Marketplace updates</span>
            <SimpleSwitch enabled={true} onChange={() => {}} />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Event reminders</span>
            <SimpleSwitch enabled={true} onChange={() => {}} />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Discussion replies</span>
            <SimpleSwitch enabled={false} onChange={() => {}} />
          </label>
        </div>
      </section>

      {/* App Preferences */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🌗 App Preferences</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Theme: Dark Mode</span>
          <SimpleSwitch enabled={false} onChange={() => {}} />
        </div>
      </section>
    </div>
  );
};

export default Settings;
