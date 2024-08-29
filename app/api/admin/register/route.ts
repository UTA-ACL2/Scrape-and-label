import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import getDatabase from "@/database/database";
import { sendEmail } from '../../verifyemail/route';

export async function POST(request: NextRequest) {
    await getDatabase();
    const body = await request.json();
    const {
        username,
        password,
        role,
        email,
        provider
    } = body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Create a new user
    console.log("About to create new user")
    console.log(body)
    const user = new User({ username, password, role , email, provider});
    console.log(user)
    await user.save();
   
    await sendEmail({email, userId: user._id})


    return NextResponse.json({ message: 'User registered successfully' });
}