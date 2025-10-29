// src/pages/ExperienceDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Experience } from "../types/Experience";

const ExperienceDetails = () => {
  const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/experiences/${id}`);
        const data = await res.json();
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };
    fetchExperience();
  }, [id]);

  if (!experience) return <p className="text-center mt-20">Loading...</p>;

    return (
      
        <div className="min-h-screen bg-gray-50">
             <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <img
            src="data:image/png;base64,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"
            alt="Logo"
            className="h-8 w-8"
          />
         
          <span className="font-semibold text-lg text-gray-800 hidden sm:inline">
            highway delite
          </span>
        </div>

       
        <div className="flex items-center space-x-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search experiences"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg px-4 py-2">
            Search
          </button>
        </div>
      </nav>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-700 flex items-center mb-6 hover:text-gray-900"
      >
        ← Back
      </button>

      {/* Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <img
            src={experience.image}
            alt={experience.title}
            className="rounded-xl w-full h-80 object-cover mb-6"
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {experience.title}
          </h2>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          {/* Choose date */}
          <h3 className="font-semibold text-gray-800 mb-2">Choose date</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"].map(
              (date, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    i === 0
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {date}
                </button>
              )
            )}
          </div>

          {/* Choose time */}
          <h3 className="font-semibold text-gray-800 mb-2">Choose time</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { time: "07:00 am", status: "4 left" },
              { time: "09:00 am", status: "2 left" },
              { time: "11:00 am", status: "5 left" },
              { time: "1:00 pm", status: "Sold out" },
            ].map((slot, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-md border text-sm ${
                  slot.status === "Sold out"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {slot.time}{" "}
                <span
                  className={`ml-1 text-xs ${
                    slot.status === "Sold out"
                      ? "text-gray-400"
                      : "text-red-500"
                  }`}
                >
                  {slot.status}
                </span>
              </button>
            ))}
          </div>

          {/* About Section */}
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-600 bg-gray-100 rounded-md p-3 text-sm">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>

        {/* Right Section - Booking Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 h-fit">
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Starts at</span>
            <span>₹{experience.price}</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Quantity</span>
            <div className="flex items-center border rounded-md px-2">
              <button className="px-2 text-lg">−</button>
              <span className="px-2">1</span>
              <button className="px-2 text-lg">+</button>
            </div>
          </div>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>₹{experience.price}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-700">
            <span>Taxes</span>
            <span>₹59</span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between font-semibold text-gray-800 mb-4">
            <span>Total</span>
            <span>₹{Number(experience.price) + 59}</span>
          </div>

          <button className="bg-gray-200 text-gray-500 font-semibold rounded-lg w-full py-2 cursor-not-allowed">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
