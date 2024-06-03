//src/server/auth.ts

import {getServerSession, type NextAuthOptions, type User as NextAuthUser} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {userService} from "../../../../auth/userService";
// Extend the User type to include a role property
// Extend the User type to include a role property
type User = NextAuthUser & { role?: string, type?: string, providerAccountId?: string };
// Extend the session.user type to include a role property

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
    },
    pages: {
        signIn: '/webapps/anivoice/login'
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