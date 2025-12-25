import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>

        <h2 className="text-xl font-semibold mb-2">
          Access Denied
        </h2>

        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
}
