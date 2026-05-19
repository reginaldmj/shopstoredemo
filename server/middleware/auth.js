// Express middleware that protects API routes using Bearer JWT tokens.
// If a valid token is present, the user is loaded and attached to req.user.

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../utils/config.js';

export default async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
