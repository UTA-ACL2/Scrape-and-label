'use client'
import React, {useEffect, useState} from 'react';

type User = {
    username: string;
    role: string;
    totalStatusChanges: number;
}

function Leaderboard() {
    const [users,
        setUsers] = useState < User[] > ([]);

    useEffect(() => {
        fetch('/api/leaderboard')
            .then(response => response.json())
            .then(data => setUsers(data.message));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div
                className="flex flex-col w-full p-8 text-gray-800shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                <div className="flex-1 flex flex-col">
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>User</th>
                                        <th>Role</th>
                                        <th>Total Labeled</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users
                                        ?.map((user, index) => (
                                            <tr
                                                key={index}
                                                className={index % 2 === 0
                                                ? 'bg-base-200'
                                                : ''}>
                                                <th>
                                                    {index === 0 && (
                                                        <div className="rating rating-md">
                                                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400"/>
                                                        </div>
                                                    )}
                                                    {index !== 0 && (
                                                        <span>
                                                            {index + 1}</span>
                                                    )}</th>
                                                <td>
                                                    {user.username}
                                                </td>
                                                <td>{user.role}</td>
                                                <td>{user.totalStatusChanges}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;