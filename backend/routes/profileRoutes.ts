import { Router } from 'express';
import Profile from '../models/profile';

const router = Router();

// Создать профиль
router.post('/', async (req, res) => {
    console.log('Received data:', req.body); // Отладочное сообщение
  
    const { firstName, lastName, email, phone, willCome } = req.body;
  
    if (!firstName || !lastName || !email || !phone || !willCome) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const profile = new Profile({
        firstName,
        lastName,
        phone,
        email,
        willCome
      });
      await profile.save();
      res.status(201).json({ profileId: profile._id });
    } catch (error) {
      console.error('Error:', error); // Отладочное сообщение
      if (error instanceof Error) {
        console.log(error)
        res.status(400).json({ error: error.message });
        console.log(error)
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });

// Получить все профили
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });

// Получить профиль по ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });

// Обновить профиль
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });
// Удалить профиль
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json({ message: 'Profile deleted' });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });

export default router;