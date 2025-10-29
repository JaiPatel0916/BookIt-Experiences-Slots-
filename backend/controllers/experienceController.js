import Experience from "../models/Experience.js";

export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch experiences", error });
    }
};


export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch experience", error });
    }
};

export const createExperience = async (req, res) => {
    try {
        const { title, description, location, price, image, slots } = req.body;

        const newExperience = new Experience({
            title,
            description,
            location,
            price,
            image,
            slots,
        });

        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        console.error("Error creating experience:", error);
        res.status(500).json({ message: "Server error while creating experience" });
    }
};