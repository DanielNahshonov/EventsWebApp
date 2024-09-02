import { Router } from "express";
import EventProfile from "../models/eventProfile";

const router = Router();

// Создать связь между событием и профилем
router.post("/", async (req, res) => {
    const {eventID,profileID}=req.body
    if (!eventID || !profileID) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  try {
    const eventProfile = new EventProfile({eventID,profileID});
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
