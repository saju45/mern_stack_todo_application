function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 text-center max-w-lg">
        {/* Heading */}
        <h1 className="text-6xl font-bold text-yellow-500 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>

        {/* Description */}
        <p className="text-lg mb-4 text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>

        {/* CTA Button */}
        <a
          href="/"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-yellow-600 transition duration-300"
        >
          Go to Home Page
        </a>

        {/* Additional Text */}
        <p className="mt-6 text-sm text-gray-500">
          If you believe this is an error, please contact the administrator.
        </p>
        <p className="mt-2 text-gray-400">Error Code: 404</p>

        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Your Website Name. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}

export default PageNotFound;
