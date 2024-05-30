//src/server/auth.ts

import {getServerSession, type NextAuthOptions, type User} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {userService} from "../../../../auth/userService";

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({token, account, profile}) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId;
            }
            return token;
        },
        async session({session, token, user}) {
            session.user.id = token.userId;
            return session;
        }
    },
    pages: {
        signIn: '/login'
    },
    providers: [Credentials({
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

                const response = await userService.authenticate(username, password);

                if (response.error) {
                    return null;
                }

                return response.data;
            }
        })]
};

export const getServerAuthSession = async() => getServerSession(authOptions);