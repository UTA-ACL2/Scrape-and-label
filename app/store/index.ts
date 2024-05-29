'use client'
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {getUserFromToken} from '../api/checkJWT';
import {getDatabase} from '../api/database';

type User = {
    username: string  | undefined;
    access: boolean | undefined;
};

interface State {
    token : string | null;
    user : User | null;
    isLoggedIn : boolean;
    login : (token : string) => void;
    logout : () => void;
    getUser : () => Promise < User | null >;
}

const getUser = async(token : string) => {
    await getDatabase();
    const user = await getUserFromToken(token);
    let access = user?.role == ("admin"|| "usurper") ? true : false;
    return {username: user?.username, access:access};
}

const useStore = create(persist < State > ((set) => ({
    token: null,
    user: null,
    isLoggedIn: false,

    login: async(token : string) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                set({token, isLoggedIn: true});
            }
        } catch (err) {
            console.log("Error: Invariant: missing action dispatcher. This is likely a bug in React. Plea" +
                    "se file an issue.");
        }
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            set({token: null, isLoggedIn: false, user: null});
        }
    },
    getUser: async function (): Promise < User | null > {
        try {
            if (typeof window !== 'undefined') {
                let token = localStorage.getItem('token');
                if (token) {
                    let user = await getUser(token);
                    return user;
                }
            }
            return null;

        } catch (e) {
            console.log("Error: Invariant: missing action dispatcher. This is likely a bug in React. Plea" +
                    "se file an issue.");
            return null;
        }
    }
}), {name: 'userLoginStatus'}));

// Load the token from localStorage when the store is created
if (typeof window !== 'undefined') {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
        // Call setUser after login
        useStore
            .getState()
            .login(savedToken);

    }
}

export default useStore;