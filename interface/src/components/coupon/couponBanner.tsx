import { useState } from "react";

export default function CouponCard({ code, description }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied to clipboard!");
  };
  return (
    <div
      className="
    w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-x2 hover:-translate-y-3 flex-1"
    >
      <div className="relative">
        <div className="absolute top-0 left-0 bg-red-400 text-white px-3 py-1 rounded-br-lg z-10">
          <span className="text-sm font-semibold">EXCLUSIVE</span>
        </div>
        <div
          className={`absolute top-2 right-2 z-10 cursor-pointer ${
            isFavorited
              ? "text-red-500 hover:text-red-600"
              : "text-gray-400 hover:text-red-500"
          }`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <StarIcon className="w-6 h-6" />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{description}</h2>
        <p className="text-gray-600 mb-4">Expires On: Jan 17, 2024</p>
        <button
          className="w-full bg-slate-500 text-white py-2 rounded-lg font-semibold hover:bg-slate-400 transition-colors duration-300"
          onClick={handleCopyToClipboard}
        >
          GET COUPON CODE
        </button>
      </div>
      <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
        <div className="flex items-center">
          <CircleCheckIcon className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm text-gray-600">Verified</span>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
            <BookmarkIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
            <ShareIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
            <WebcamIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function WebcamIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}
