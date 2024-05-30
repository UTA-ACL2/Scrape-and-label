export const userService = {
    authenticate
};

import User from '@/models/userModel';
import {getDatabase} from '@/database/database';

async function authenticate(username : string, password : string) {
    try {
        await getDatabase();
        const db_user = await User.findOne({username});
        if (!db_user || !db_user.validatePassword(password)) {
            throw new Error("User Not Found.");
        };

        let user = {
            id: db_user.id,
            name: db_user.username,
            role: db_user.role
        };
        return { data: user, error: null };
    } catch (error:any) {
        return { data: null, error: error.message };
    }
}