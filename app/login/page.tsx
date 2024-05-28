'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {getDatabase} from '../api/database';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [db, setdb] = useState<any>(null);
    useEffect(() => {
        if(!db){
            getDatabase();
            setdb(true);
        }
    }, []);
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const response = await axios.post('/api/login', { username, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        // Redirect to the home page
        router.push('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }} />
                <button type="submit" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none', background: '#0070f3', color: 'white', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
}