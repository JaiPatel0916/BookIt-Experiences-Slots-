import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

// ---------- SERVE FRONTEND (React build) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// ✅ Express v5 compatible fallback for SPA routing
app.use((req, res, next) => {
    // If request starts with /api — it's not a frontend route
    if (req.originalUrl.startsWith("/api")) {
        return res.status(404).json({ message: "API route not found" });
    }

    // For all other routes, serve index.html (React SPA)
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
