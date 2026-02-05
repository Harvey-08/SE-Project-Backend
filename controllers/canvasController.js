import Canvas from '../models/Canvas.js';
import { v4 as uuidv4 } from 'uuid'; // We might need to install uuid or just use random string

// @desc    Create a new canvas
// @route   POST /api/canvas/create
// @access  Private
export const createCanvas = async (req, res) => {
    const { name } = req.body;

    try {
        const canvasId = Math.random().toString(36).substring(2, 9); // Simple ID generation

        const canvas = await Canvas.create({
            canvasId,
            name: name || 'Untitled Canvas',
            owner: req.user._id,
        });

        res.status(201).json(canvas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Join/Get canvas metadata
// @route   GET /api/canvas/:id
// @access  Private (or Public if sharing allowed)
export const getCanvas = async (req, res) => {
    try {
        const canvas = await Canvas.findOne({ canvasId: req.params.id }).populate('owner', 'name email');

        if (canvas) {
            res.json(canvas);
        } else {
            res.status(404).json({ message: 'Canvas not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all canvases for current user
// @route   GET /api/canvas/my-canvases
// @access  Private
export const getMyCanvases = async (req, res) => {
    try {
        const canvases = await Canvas.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.json(canvases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
