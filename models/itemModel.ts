"use server";

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
import Keyword from './keywordModel';

const itemSchema = new mongoose.Schema({
    title: String,
    thumbnails: String,
    duration: String,
    viewCount: String,
    channel: String,
    video_id: String,
    keyword: {
        type: ObjectId,
        ref: 'Keyword',
    },
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
        default: null,
    },
    keywordGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KeywordGroup',
    },
});
itemSchema.pre('save', async function(next) {
    if (this.isModified('keyword')) {
        const keyword = await Keyword.findById(this.keyword);
        if (keyword && keyword.superset) {
            this.keywordGroup = keyword.superset;
        }
    }
    next();
});
itemSchema.index({ video_id: 1, keywordGroup: 1 }, { unique: true });

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;