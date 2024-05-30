"use server";

import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: String,
    thumbnails: String,
    duration: String,
    viewCount: String,
    channel: String,
    video_id: String,
    keyword: String,
    status: {
        type: String,
        default: 'incomplete'
    },
    label: {
        type: String,
        default: 'none'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    labeledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    exclude: {
        type: Boolean,
        default: false
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

itemSchema.index({ video_id: 1, keyword: 1 }, { unique: true });

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;