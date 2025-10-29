import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Experience } from "../types/Experience";

export default function ExperienceDetails() {
  const { id } = useParams(); // ✅ get :id from URL
  const [experience, setExperience] = useState<Experience | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // ✅ Fetch experience details
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/experiences/${id}`);
        const data = await res.json();
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience details:", error);
      }
    };
    fetchExperience();
  }, [id]);

  if (!experience)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading experience details...
      </div>
    );

  const subtotal = experience.price * quantity;
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + tax;

  return (
    <div className="px-6 md:px-12 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Image + Info */}
      <div className="lg:col-span-2">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-80 md:h-[400px] object-cover rounded-xl"
        />

        <div className="mt-6">
          <h1 className="text-2xl font-semibold">{experience.title}</h1>
          <p className="text-gray-600 mt-2">{experience.description}</p>
        </div>

        {/* Choose Date */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Choose date</h2>
          <div className="flex flex-wrap gap-2">
            {experience.slots.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDate(slot.date)}
                className={`px-4 py-2 rounded-md border ${
                  selectedDate === slot.date
                    ? "bg-yellow-400 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {new Date(slot.date).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })}
              </button>
            ))}
          </div>
        </div>

        {/* Choose Time */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Choose time</h2>
          <div className="flex flex-wrap gap-2">
            {experience.slots.map((slot, idx) => (
              <button
                key={idx}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`px-4 py-2 rounded-md border ${
                  selectedTime === slot.time
                    ? "bg-gray-900 text-white"
                    : slot.available
                    ? "hover:bg-gray-100"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">About</h2>
          <div className="bg-gray-100 text-gray-700 p-3 rounded-md text-sm">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </div>
        </div>
      </div>

      {/* RIGHT: Booking Card */}
      <div className="border rounded-xl p-6 h-fit shadow-sm">
        <p className="text-gray-500 text-sm">Starts at</p>
        <p className="text-xl font-semibold mb-4">₹{experience.price}</p>

        {/* Quantity Controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800">
          Confirm
        </button>
      </div>
    </div>
  );
}
