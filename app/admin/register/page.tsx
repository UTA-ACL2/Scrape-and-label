'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import api from '../../api/api';

type User = {
    _id: string;
    username: string;
    role: string;
    isActive: boolean;
    email: string;
};

export default function Page() {
    const router = useRouter();
    const [username,
        setUsername] = useState('');
    const [password,
        setPassword] = useState('');
    const [role,
        setRole] = useState('student');
    const [email, 
        setEmail] = useState(''); 
    const [db,
        setdb] = useState < any > (null);
    const [users,
    setUsers] = useState < User[] > ([]);

    const handleSubmit = async(event : any) => {
        event.preventDefault();
        console.log(email)
        const response = await api.post('/api/admin/register', {username, password, role, email});
        if (response.status === 200) {
            // Redirect to the login page after successful registration
            fetchUsers();
        } else {
            // Handle error here
            console.error('Registration failed');
        }
    };

    const fetchUsers = async() => {
        const response = await api.get('/api/admin/users');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleActive = async(userId : any) => {
        const response = await api.post('/api/admin/users/toggleActive', {userId});
        if (response.status === 200) {
            // Update the users state
            setUsers(users.map(user => user._id === userId
                ? {
                    ...user,
                    isActive: !user.isActive
                }
                : user));
        }
    };

    return (
        <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#282c34',
            color: '#fff'
        }}>
            <table
                style={{
                borderCollapse: 'collapse',
                width: '80%',
                textAlign: 'center',
                color: '#61dafb',
                border: '2px solid #61dafb'
            }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ border: '1px solid #61dafb' }}>
                        <td>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"/>
                        </td>
                        <td>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="usurper">usurper</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"/>
                        </td>
                        <td>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"/>
                        </td>
                        <td>
                            <button onClick={handleSubmit}>Register</button>
                        </td>
                    </tr>
                    {users.map(user => (
                        <tr  style={{ border: '1px solid #61dafb' }} key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.isActive
                                    ? 'Active'
                                    : 'Inactive'}</td>
                            <td>
                                {user.role !== 'usurper' && (
                                    <button onClick={() => handleToggleActive(user._id)}>
                                        {user.isActive
                                            ? 'Deactivate'
                                            : 'Activate'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}