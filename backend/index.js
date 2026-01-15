import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import pasteRoutes from "./routes/pasteRoutes.js";

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/pastes", pasteRoutes);

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);