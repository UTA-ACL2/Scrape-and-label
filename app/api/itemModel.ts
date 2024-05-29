import mongoose, {  models } from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: String,
    thumbnails: String,
    duration: String,
    viewCount: String,
    channel: String,
    video_id: String,
    status: {
        type: String,
        default: 'incomplete'
    },
    label: {
        type: String,
        default: 'none'
    }
});


const Item= models.Item || mongoose.model('Item', itemSchema);
export default Item;