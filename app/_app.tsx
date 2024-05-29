import { useStore } from './store';
import Navbar from './Components/Navbar'; // Import the Navbar component

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    // Use `user` and `setUser` here...

    const handleLogout = () => {
        // Clear the user data from the global state
        setUser(null); // Update the argument to be of type 'User' instead of 'string'
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page or do other cleanup tasks
    };

    return (
        <>
            <Navbar handleLogout={handleLogout}/> {/* Include the Navbar component */}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;