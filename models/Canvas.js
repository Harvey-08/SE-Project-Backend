import mongoose from 'mongoose';

const canvasSchema = new mongoose.Schema({
    canvasId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        default: 'Untitled Canvas',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    documentState: {
        type: Buffer, // Stores the binary Yjs update
        default: null,
    },
}, { timestamps: true });

const Canvas = mongoose.model('Canvas', canvasSchema);

export default Canvas;
