"use server";
import mongoose, { Document, Model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    username: string;
    password: string;
    role: 'admin' | 'student' | 'usurper' | 'user';
    isActive: boolean;
    createdAt: Date;
    youtubeCookie: string;
    totalStatusChanges: number;
    avatar: string;
    verified: boolean
    verificationToken: string | undefined
    email: string
    provider: string
}

interface IUserDocument extends IUser, Document {
    validatePassword: (password: string) => boolean;
}
const userSchema = new mongoose.Schema<IUserDocument>({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: false
    },
    youtubeCookie: String,
    role: {
        type: String,
        enum: ['admin', 'student', 'usurper', 'user'],
        default: 'student'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    totalStatusChanges: {
        type: Number,
        default: 0
    },
    avatar: String,
    verified: {
        type: Boolean,
        default: false,
        
    },
    verificationToken: String,
    email: String,
    provider: {
        type: String,
        default: 'Credentials'
    },
});

userSchema.methods.validatePassword = function(password: string) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', async function(next) {
    if (this.isModified('password') && this.password) {
        (this as any).password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User: Model<IUserDocument> = models.User || mongoose.model('User', userSchema);

export default User;