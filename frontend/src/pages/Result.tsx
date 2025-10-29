import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingId = (state as any)?.bookingId ?? "N/A";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mx-auto mb-6">
          ✓
        </div>
        <h1 className="text-2xl font-semibold mb-2">Booking Confirmed</h1>
        <p className="text-gray-600 mb-6">Ref ID: <span className="font-medium">{bookingId}</span></p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
