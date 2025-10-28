import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ["confirmed", "failed"], default: "confirmed" },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
