export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Sign In
        </h2>
        
        <p className="text-gray-600 mb-8">
          The Login page is currently being built by your teammate.
        </p>

        <div className="text-sm text-gray-500">
          For now, you can use the registration flow (which auto-logs you in).
        </div>

        <a 
          href="/register" 
          className="mt-6 inline-block px-6 py-3 bg-[#6F1D1B] text-white rounded-lg hover:bg-[#5a1716] transition"
        >
          Go to Sign Up
        </a>
      </div>
    </div>
  );
}