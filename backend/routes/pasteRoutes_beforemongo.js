import express from "express";
import Paste from "../models/Paste.js";

const router = express.Router();


router.post("/", async (req, res) => {
    const paste = await Paste.create(req.body);
    res.json(paste);
});


router.get("/", async (req, res) => {
    const pastes = await Paste.find();
    res.json(pastes);
});


router.delete("/:id", async (req, res) => {
    await Paste.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

export default router;
