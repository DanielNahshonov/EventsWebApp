import { Router } from "express";
import EventProfile from "../models/eventProfile";

const router = Router();

// Создать связь между событием и профилем
router.post("/eventprofiles", async (req, res) => {
  try {
    const eventProfile = new EventProfile(req.body);
    await eventProfile.save();
    res.status(201).json(eventProfile);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// Получить все связи между событиями и профилями
router.get("/eventprofiles", async (req, res) => {
  try {
    const eventProfiles = await EventProfile.find()
      .populate("eventID")
      .populate("profileID");
    res.status(200).json(eventProfiles);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Получить связь по ID
router.get("/eventprofiles/:id", async (req, res) => {
  try {
    const eventProfile = await EventProfile.findById(req.params.id)
      .populate("eventID")
      .populate("profileID");
    if (!eventProfile)
      return res.status(404).json({ error: "EventProfile not found" });
    res.status(200).json(eventProfile);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Обновить связь
router.put("/eventprofiles/:id", async (req, res) => {
  try {
    const eventProfile = await EventProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!eventProfile)
      return res.status(404).json({ error: "EventProfile not found" });
    res.status(200).json(eventProfile);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Удалить связь
router.delete("/eventprofiles/:id", async (req, res) => {
  try {
    const eventProfile = await EventProfile.findByIdAndDelete(req.params.id);
    if (!eventProfile)
      return res.status(404).json({ error: "EventProfile not found" });
    res.status(200).json({ message: "EventProfile deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default router;
