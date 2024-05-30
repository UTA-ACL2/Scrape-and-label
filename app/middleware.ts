import NextAuth from 'next-auth';
import {getSession} from 'next-auth/react';
import {NextApiResponse, NextApiRequest} from 'next';
import {NextResponse} from 'next/server';

export default async function middleware(req : NextApiRequest) {
    const session = await getSession({req});
    const isAuthenticated = !!session;
    const isPublicRoute = req.url === '/login';
    const isAdminRoute = req
        ?.url
            ?.startsWith('/admin');

    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect('/login');
    } else if (isAdminRoute && session
        ?.user
            ?.role !== 'admin') {
        return NextResponse.json({
            error: 'Access Denied'
        }, {status: 403})
    } else {
        return NextResponse.redirect(req.url || '/');
    }
}

export const config = {
    api: {
        bodyParser: false
    }
};