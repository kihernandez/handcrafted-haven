export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Sign In
          </h2>
          <p className="text-gray-600 mt-2">
            The Login page is currently being built by your teammate.
          </p>
        </div>

        <div className="text-sm text-gray-500 mb-8">
          For now, you can use the registration flow (which auto-logs you in).
        </div>

        {/* Forgot Password Link - Added here for consistency */}
        <div className="text-center mb-6">
          <a 
            href="/forgot-password" 
            className="text-sm text-[#6F1D1B] hover:underline font-medium"
          >
            Forgot Password?
          </a>
        </div>

        <a 
          href="/register" 
          className="w-full block text-center py-3 bg-[#6F1D1B] text-white rounded-lg hover:bg-[#5a1716] transition font-medium"
        >
          Go to Sign Up
        </a>
      </div>
    </div>
  );
}