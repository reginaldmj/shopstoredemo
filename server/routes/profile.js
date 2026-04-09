import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt
  };
}

router.get('/', auth, async (req, res) => {
  return res.json({ profile: sanitizeUser(req.user) });
});

router.put('/', auth, async (req, res) => {
  try {
    const { name, bio, avatarUrl } = req.body;

    if (typeof name === 'string') req.user.name = name.trim();
    if (typeof bio === 'string') req.user.bio = bio.trim();
    if (typeof avatarUrl === 'string') req.user.avatarUrl = avatarUrl.trim();

    await req.user.save();
    return res.json({ profile: sanitizeUser(req.user) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile' });
  }
});

export default router;
