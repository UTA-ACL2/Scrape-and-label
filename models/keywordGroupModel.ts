"use server";

import mongoose, { models } from 'mongoose';

const keywordGroupSchema = new mongoose.Schema({
    keyword: {
        type: String,
        unique: true,
    },

});

const Keyword = models.KeywordGroup || mongoose.model('KeywordGroup', keywordGroupSchema);

export default Keyword;