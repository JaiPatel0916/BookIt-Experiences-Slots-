import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Experience } from "../types/Experience";
import Navbar from "../components/Navbar";

type CheckoutState = {
  experience: Experience;
  experienceId: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
} | null;

export default function Checkout() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state as CheckoutState) ?? null;

  useEffect(() => {
    if (!state) nav("/", { replace: true });
  }, [state, nav]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplying, setPromoApplying] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const subtotal = state?.subtotal ?? 0;
  const tax = subtotal * 0.05; // 5%
  const totalBeforeDiscount = subtotal + tax;
  const totalAfterDiscount = Math.max(0, totalBeforeDiscount - discountAmount);


  const applyPromo = async () => {
    setPromoApplying(true);
    setPromoMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promo,
          totalPrice: totalBeforeDiscount, 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPromoMessage(data.message || "Invalid promo");
        setDiscountAmount(0);
        return;
      }

   
      setDiscountAmount(data.discount ?? 0);
      setPromoMessage(data.message ?? "Promo applied successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to validate promo");
    } finally {
      setPromoApplying(false);
    }
  };

  const handlePay = async () => {
    setError("");
    setProcessing(true);

    if (!state) {
      setError("Booking data missing.");
      setProcessing(false);
      return;
    }
    if (!name || !email) {
      setError("Please enter name and email.");
      setProcessing(false);
      return;
    }
    if (!agreed) {
      setError("Please agree to the terms and safety policy.");
      setProcessing(false);
      return;
    }

    const payload = {
      experienceId: state.experienceId,
      name,
      email,
      date: state.date,
      time: state.time,
      totalPrice: Number(totalAfterDiscount.toFixed(2)),
      quantity: state.quantity,
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Booking failed");
        setProcessing(false);
        return;
      }

      nav("/result", {
        state: {
          bookingId: data.booking?._id ?? data.booking?.id ?? data.bookingId ?? "N/A",
          message: data.message ?? "Booking Confirmed",
        },
      });
    } catch (err) {
      console.error(err);
      setError("Server error while creating booking");
      setProcessing(false);
    }
  };

  if (!state) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => window.history.back()}
          className="text-sm text-gray-700 mb-4 flex items-center gap-2 hover:text-gray-900"
        >
          ← Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 p-3 bg-gray-100 rounded"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 p-3 bg-gray-100 rounded"
                  placeholder="you@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-700">Promo code</label>
              
<div className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center sm:items-center gap-3 mt-2">
  <input
    value={promo}
    onChange={(e) => setPromo(e.target.value)}
    placeholder="Promo code"
    className="flex-1 p-3 bg-gray-100 rounded"
  />
  <button
    onClick={applyPromo}
    disabled={promoApplying}
    className="px-4 py-3 bg-black text-white rounded w-full xs:w-auto sm:w-auto"
  >
    {promoApplying ? "Applying..." : "Apply"}
  </button>
</div>

                {promoMessage && (
                  <p className="text-sm mt-2 text-green-600">{promoMessage}</p>
                )}
              </div>

              <div className="md:col-span-2 mt-3">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>I agree to the terms and safety policy</span>
                </label>
              </div>
            </div>
          </div>

   
          <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
            <div className="mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Experience</span>
                <span>{state.experience.title}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Date</span>
                <span>{state.date}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Time</span>
                <span>{state.time}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Qty</span>
                <span>{state.quantity}</span>
              </div>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Taxes (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Discount</span>
                <span>- ₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between font-semibold text-lg mt-3 mb-4">
              <span>Total</span>
              <span>₹{totalAfterDiscount.toFixed(2)}</span>
            </div>

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-3 rounded bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
            >
              {processing ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
