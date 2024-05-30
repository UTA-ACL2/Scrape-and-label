"use server";

import mongoose, { models } from 'mongoose';

const keywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        unique: true,
    },
});

const Keyword = models.Keyword || mongoose.model('Keyword', keywordSchema);

export default Keyword;