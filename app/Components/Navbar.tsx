import Link from 'next/link';
import {useStore} from '../store';

const Navbar = ({handleLogout}: {handleLogout: () => void}) => {
    const user = useStore((state) => state.user);

    return (
        <nav>
            <a>Welcome {user?.username}</a>
            <Link href="/">Home</Link>
            {user && (user.role === 'usurper' || user.role === 'admin') && <Link href="/register">Register</Link>}
            {user && (
                <Link href="/login">
                    <a onClick={handleLogout}>Logout</a>
                </Link>
            )}
        </nav>
    );
};

export default Navbar;