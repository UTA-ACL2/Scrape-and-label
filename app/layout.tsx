// layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import SessionWrapper from './components/SessionWrapper';
import { ToastContainer } from 'react-toastify';

// import DatabaseConnectionProvider from './components/DatabaseConnectionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AniVoice',
    description: 'https://acl-group.github.io/index.html',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionWrapper>
                        <Navbar /><ToastContainer /> {children}
                </SessionWrapper>
            </body>
        </html>
    );
}