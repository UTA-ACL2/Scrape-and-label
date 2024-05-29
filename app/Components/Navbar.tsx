"use client"
import Link from 'next/link';
import useStore from '../store';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Nav = styled.nav `
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 1em;
`;

const NavLink = styled.a `
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #ddd;
  }
`;

const WelcomeMessage = styled.a `
  color: #fff;
`;

const Navbar = () => {
    const router = useRouter()
    const getUser = useStore(state => state.getUser);
    const logout = useStore((state) => state.logout);
    const [user, setuser] = useState({username: '', access: false});
    let loggedinRef = useRef(useStore.getState().isLoggedIn)

    // ...
    const [isLoading, setIsLoading] = useState(true); // Add this line

    const fetchUser = async () => {
      setIsLoading(true); // Add this line
      let fetched_user = await useStore.getState().getUser();
      if(!fetched_user){
        return; 
      }
      setuser({username: fetched_user?.username||"", access: fetched_user?.access||false});
      setIsLoading(false); // Add this line
  }

    useEffect(() => {
      (async () => {
        await fetchUser();
      })();
    }, [loggedinRef.current]);

    if (isLoading) {
        return <div>Loading...</div>; // Or replace this with a loading spinner
    }

    const handleLogout = () => {
      console.log("here")
        // Clear the user data from the global state
        logout(); // Update the argument to be of type 'User' instead of 'string'
        router.push('/login')
    };
    // localStorage.removeItem('token');
  
return (
  <div>

    {loggedinRef.current && user && user.username !== '' &&
        <Nav>
              {loggedinRef.current && (
                <>
                  <WelcomeMessage>
                    Welcome, <span style={{ color: 'red' }}>{user?.username}</span>
                  </WelcomeMessage>
                    <Link href="/" passHref>
                      AniVoice
                    </Link>
                </>
              )}
              {user && (user.access) && (
                <Link href="/register" passHref>
                  Register
                </Link>
              )}
              {loggedinRef.current && <NavLink onClick={handleLogout}>Logout</NavLink>}
        </Nav>
    }
  </div>
);
};
export default Navbar;