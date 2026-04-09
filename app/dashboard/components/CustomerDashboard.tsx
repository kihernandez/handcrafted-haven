export default function CustomerDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Order History</h2>
          <p className="text-gray-600 mt-2">Track your past purchases.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Saved Items</h2>
          <p className="text-gray-600 mt-2">View your wishlist.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          <p className="text-gray-600 mt-2">Manage your profile.</p>
        </div>
      </div>
    </div>
  );
}
