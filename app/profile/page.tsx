import { getCurrentUser } from "../lib/auth";   // ← Relative import (this fixes the red line)
import LogoutButton from "../LogoutButton";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl text-red-600">You are not logged in.</p>
          <a href="/register" className="text-blue-600 underline mt-4 inline-block">
            Go to Sign Up
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6F1D1B]">
        My Profile
      </h1>
      
      <div className="space-y-4 text-lg border-b pb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>

      <div className="mt-8">
        <LogoutButton />
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        This is a temporary test page for login/logout
      </p>
    </div>
  );
}