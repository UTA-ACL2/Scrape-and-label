import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'
import getDatabase from "@/database/database";
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest){
    await getDatabase()
    try{
        const body = await req.json()
        console.log('TOKEN')
        const token = body.verificationToken
        console.log(token)

        const user = await User.findOne({verificationToken:token})
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status:400})
        }
        console.log(user)
        user.verified = true;
        user.verificationToken = undefined;
        user.save()

    }
    catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})

    }
    return NextResponse.json({message: 'Sucessful'}, {status:200})
}

export const sendEmail = async({email, userId}:any) =>{
    
    try{
        const tok = await bcryptjs.hash(userId.toString(), 12)
        await User.findByIdAndUpdate(userId, {verificationToken: tok})
        var transport = nodemailer.createTransport({
            service: 'gmail',
            host:'smtp.gmail.com',
            port:587,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        
        const emailContent = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Verify Account",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${tok}">here</a> to verify account.
                  or copy and paste the link.<br>${process.env.DOMAIN}/verifyemail?token=${tok}</p>`
        };
        const emailResponse = await transport.sendMail(emailContent);
        return emailResponse;   

    }
    catch (error:any){
        throw new Error(error.message)
    }
}
