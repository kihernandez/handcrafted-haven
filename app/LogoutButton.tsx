"use client";

import { logoutAction } from "./actions/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm font-medium"
    >
      Logout
    </button>
  );
}