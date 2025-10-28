import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

//POST/ bookings - Accept booking details
export const createBooking = async (req, res) => {
    try {
        const { experienceId, name, email, date, time, totalPrice } = req.body;

        if (!experienceId || !name || !email || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

       
        const existingBooking = await Booking.findOne({ experience: experienceId, date, time });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked" });
        }

       
        const booking = new Booking({
            experience: experienceId,
            name,
            email,
            date,
            time,
            totalPrice,
            status: "confirmed",
        });

        await booking.save();
        res.status(201).json({
            message: "Booking successful!",
            booking,
        });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Server error while creating booking" });
    }
};


export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("experience");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching bookings" });
    }
};
