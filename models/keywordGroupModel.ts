"use server";

import mongoose, { models } from 'mongoose';

const keywordGroupSchema = new mongoose.Schema({
    keyword: {
        type: String,
        unique: true,
    },

});

const KeywordGroup = models.KeywordGroup || mongoose.model('KeywordGroup', keywordGroupSchema);

export default KeywordGroup;