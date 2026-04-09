import Link from "next/link";

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Seller Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-gray-600 mt-2">Manage your listings.</p>
          <Link href="/dashboard/products" className="text-[#6F1D1B] font-medium mt-4 inline-block">
            View Products →
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <p className="text-gray-600 mt-2">Create a new listing.</p>
          <Link href="/dashboard/add-product" className="text-[#6F1D1B] font-medium mt-4 inline-block">
            Add Product →
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-gray-600 mt-2">View customer orders.</p>
          <Link href="/dashboard/orders" className="text-[#6F1D1B] font-medium mt-4 inline-block">
            View Orders →
          </Link>
        </div>
      </div>
    </div>
  );
}
