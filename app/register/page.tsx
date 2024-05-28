'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {getDatabase} from '../api/database';



export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [db, setdb] = useState<any>(null);
    useEffect(() => {
        if(!db){
            getDatabase();
            setdb(true);
        }
    }, []);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const response = await axios.post('/api/register', { username, password, role });
        if (response.status === 200) {
            // Redirect to the login page after successful registration
            router.push('/login');
        } else {
            // Handle error here
            console.error('Registration failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }} />
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="usurper">usurper</option>
                </select>
                <button type="submit" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none', background: '#0070f3', color: 'white', cursor: 'pointer' }}>Register</button>
            </form>
        </div>
    );
}