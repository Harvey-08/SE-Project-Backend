import express from 'express';
import { createCanvas, getCanvas, getMyCanvases } from '../controllers/canvasController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createCanvas);
router.get('/my-canvases', protect, getMyCanvases);
router.get('/:id', protect, getCanvas);

export default router;
