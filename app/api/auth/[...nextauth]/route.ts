import NextAuth from "next-auth";
import {NextApiRequest, NextApiResponse} from "next";
import {authOptions} from "./options";

export default function auth(req : NextApiRequest, res : NextApiResponse) {
    req.headers["x-forwarded-host"] = process.env.NEXTAUTH_URL;
    return NextAuth(req, res, authOptions);
}