import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
            {/* Illustration/Icon */}
            <svg
                className="w-16 h-16 text-gray-400 mb-4"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true" /* decorative icon */
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 8v3a1 1 0 0 0 1 1h3" />
                <path d="M7 8v8" />
                <path d="M17 8v3a1 1 0 0 0 1 1h3" />
                <path d="M21 8v8" />
                <path d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" />
            </svg>

            {/* Error message */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                404 – Page Not Found
            </h1>

            {/* Optional secondary text */}
            <p className="mt-2 text-gray-600">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            {/* Search bar */}
            {/* <form className="mt-6 w-full max-w-md" role="search" aria-label="Site Search">
                <label htmlFor="search-input" className="sr-only">Search</label>
                <div className="relative">
                    <input
                        type="text" id="search-input" name="query"
                        className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for topics..."
                    />
                    <svg
                        className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -mt-2.5 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    >
                        <path fillRule="evenodd" d="M8.5 3a5.5 5.5 0 0 1 4.364 8.916l3.622 3.622a.75.75 0 1 1-1.06 1.06l-3.622-3.622A5.5 5.5 0 1 1 8.5 3zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" clipRule="evenodd" />
                    </svg>
                </div>
            </form> */}

            {/* Home button */}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 inline-block bg-blue-600 text-white text-sm font-medium py-3 px-6 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ← Back to Homepage
            </button>
        </div>
    );
};

export default NotFoundPage;