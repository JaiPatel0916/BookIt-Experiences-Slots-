import express from "express";
import { getExperiences, getExperienceById , createExperience} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.post("/", createExperience);
export default router;
