"use server";

import mongoose, { models } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const keywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        unique: true,
    },
    superset: {
        type: ObjectId,
        ref: 'KeywordGroup',
    },
});

const Keyword = models.Keyword || mongoose.model('Keyword', keywordSchema);

export default Keyword;