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


router.get("/:id", async (req, res) => {
    try {
        const paste = await Paste.findById(req.params.id);
        res.json(paste);
    } catch (error) {
        res.status(404).json({ message: "Note not found" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const updatedPaste = await Paste.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPaste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    await Paste.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

export default router;
