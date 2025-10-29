import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Experience } from "../types/Experience";
import Navbar from "../components/Navbar";

interface Booking {
  _id: string;
  experience: Experience;
  name: string;
  email: string;
  date: string;
  time: string;
  quantity?: number;
}

interface TimeSlot {
  time: string;
  capacity: number;
}

const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string>("");
  const dates = ["Oct 30", "Oct 31", "Nov 1", "Nov 2", "Nov 3"];
  const timeSlots: TimeSlot[] = [
    { time: "07:00 am", capacity: 4 },
    { time: "09:00 am", capacity: 2 },
    { time: "11:00 am", capacity: 5 },
    { time: "01:00 pm", capacity: 2 }, 
  ];

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const [expRes, bookingRes] = await Promise.all([
          fetch(`https://bookit-fullstack.onrender.com/api/experiences/${id}`),
          fetch(`https://bookit-fullstack.onrender.com/api/bookings`),
        ]);

        const expData = await expRes.json();
        const bookingData = await bookingRes.json();

        setExperience(expData);
        const filtered: Booking[] = bookingData.filter(
          (b: Booking) => b.experience?._id === id || String(b.experience) === id
        );
        setBookings(filtered);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load experience.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getBookedCount = (date: string, time: string) => {
    return bookings.reduce((acc, b) => {
      if (b.date === date && b.time === time) {
        return acc + (b.quantity ?? 1);
      }
      return acc;
    }, 0);
  };

  const getAvailableForSlot = (date: string, time: string) => {
    const slot = timeSlots.find((s) => s.time === time);
    if (!slot) return 0;
    const booked = getBookedCount(date, time);
    return Math.max(0, slot.capacity - booked);
  };

  const handleConfirm = () => {
    setMessage("");
    if (!selectedDate || !selectedTime) {
      setMessage("Please select a date and time.");
      return;
    }
    const available = getAvailableForSlot(selectedDate, selectedTime);
    if (available <= 0) {
      setMessage("This slot is sold out. Choose another time.");
      return;
    }
    if (quantity > available) {
      setMessage(`Only ${available} seats left for this slot. Lower the quantity.`);
      return;
    }
    if (!experience) {
      setMessage("Experience not loaded yet.");
      return;
    }

    const subtotal = experience.price * quantity;
    const tax = subtotal * 0.05; 
    const total = subtotal + tax;

    navigate("/checkout", {
      state: {
        experience,
        experienceId: id,
        date: selectedDate,
        time: selectedTime,
        quantity,
        subtotal,
        tax,
        total,
      },
    });
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!experience) return <p className="text-center mt-20">{message || "Experience not found"}</p>;

  const imageUrl = experience.image;

  return (
    <div className="min-h-screen bg-gray-50">
<Navbar onSearch={(value) => setSearch(value)} />

      <div className="max-w-6xl mx-auto px-6 py-8">
      
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-700 mb-4 flex items-center gap-2 hover:text-gray-900"
        >
          ← Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
       
          <div className="lg:col-span-2">
            <img
              src={imageUrl}
              alt={experience.title}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <h2 className="text-2xl font-semibold mb-2">{experience.title}</h2>
            <p className="text-gray-600 mb-6">{experience.description}</p>

          
            <h3 className="font-semibold mb-2">Choose date</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-4 py-2 rounded-md border text-sm ${
                    selectedDate === d
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

         
            <h3 className="font-semibold mb-2">Choose time</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {timeSlots.map((slot) => {
                const available = selectedDate ? getAvailableForSlot(selectedDate, slot.time) : slot.capacity;
                const soldOut = available <= 0;
                return (
                  <button
                    key={slot.time}
                    onClick={() => !soldOut && setSelectedTime(slot.time)}
                    disabled={soldOut}
                    className={`px-4 py-2 rounded-md border text-sm flex items-center gap-2 ${
                      soldOut
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedTime === slot.time
                        ? "bg-yellow-400 text-white border-yellow-400"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span className={`text-xs ${soldOut ? "text-gray-400" : "text-red-500"}`}>
                      {soldOut ? "Sold out" : `${available} left`}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-gray-500 mb-6">All times are in IST (GMT +5:30)</p>

            <h3 className="font-semibold mb-2">About</h3>
            <p className="bg-gray-100 p-3 rounded text-sm text-gray-700">Scenic routes, trained guides, safety briefing. Minimum age 10.</p>
          </div>

       
          <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
            <div className="flex justify-between text-gray-700 mb-3">
              <span>Starts at</span>
              <span>₹{experience.price}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span>Quantity</span>
              <div className="flex items-center space-x-2 border rounded px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-2">+</button>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{(experience.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Taxes (5%)</span>
                <span>₹{(experience.price * quantity * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{(experience.price * quantity * 1.05).toFixed(2)}</span>
              </div>
            </div>

            {message && <p className="text-sm text-red-600 mt-3">{message}</p>}

            <button
              onClick={handleConfirm}
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
