//src/server/auth.ts

import {getServerSession, type NextAuthOptions, type User as NextAuthUser} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {userService} from "../../../../auth/userService";
// Extend the User type to include a role property
// Extend the User type to include a role property
type User = NextAuthUser & { role?: string, type?: string, providerAccountId?: string };
// Extend the session.user type to include a role property

import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import getDatabase from "@/database/database";
import User from "@/models/userModel";


export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            const Exteduser: User = user;
            if (Exteduser) {
                token.role = Exteduser.role;
                token.id = Exteduser.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                const user = session.user;
                user.role = token.role as any;
                user.id = token.id  as any;
            }
            return session;
        },
        async signIn({account, profile}){
            console.log("IN SIGN IN PAGE")
            console.log(account)
            console.log(profile)
            if(account?.provider != 'google'){
                return true

            }
            if(!profile?.email){
                console.log("PROFILE ERROR")
                throw new Error('Profile Error')
            }
            await getDatabase();
            const existingUser = await User.findOne({email: profile.email})
            if(existingUser){
                console.log("Existing user")
                console.log(existingUser)
                if(existingUser.username != profile.name) {
                    console.log("ggg")
                    existingUser.username = profile.name!
                    await existingUser.save()
                }
            }else{
                console.log("Trying to add to database")
                const username = profile.name
                const email = profile.email
                const password = ""
                const role = "student"
                console.log("Before creating user")
                const user = new User({ username, password, role, email});
                console.log(user)
                await user.save();
            }
            return true

        },
    },
    pages: {
        signIn: '/login'
    },
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                const {username, password} = credentials as {
                    username : string
                    password : string
                };
                console.log(password)

                const response = await userService.authenticate(username, password);

                if (response.error) {
                    return null;
                }

                return response.data;
            }
        })]
};

export const getServerAuthSession = async() => getServerSession(authOptions);