import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    available: { type: Boolean, default: true },
});

const experienceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }, 
        slots: [slotSchema],
    },
    { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
