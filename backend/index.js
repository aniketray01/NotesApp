import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import pasteRoutes from "./routes/pasteRoutes.js";

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000;

const app = express();
// --- CHANGED: CORS configuration to allow Vercel/Render communication ---
app.use(cors());
app.use(express.json());

// Add Health Check route (important for Render deployment)
app.get("/", (req, res) => {
    res.send("Backend API is running successfully!");
});

app.use("/api/pastes", pasteRoutes);

app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
);