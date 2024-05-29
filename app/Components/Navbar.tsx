"use client"
import Link from 'next/link';
import useStore from '../store';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

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
    const getUser = useStore(state => state.getUser);
    const loggedin = useStore(state => state.isLoggedIn);
    const logout = useStore((state) => state.logout);
    const [user, setuser] = useState({username: '', role: ''});

    useEffect(() => {
        if(user.username === '') {
        const fetchUser = async () => {
            let fetched_user = await getUser();
            setuser({username: fetched_user?.username||"", role: fetched_user?.role||""});
        };
        fetchUser();
    }
    }, [loggedin]);
    const handleLogout = () => {
        // Clear the user data from the global state
        logout(); // Update the argument to be of type 'User' instead of 'string'
        // Clear the token from local storage
        // Redirect to the login page or do other cleanup tasks
    };
    // localStorage.removeItem('token');
  
return (
  <div>
    {!user || user.username === '' ? (
      <div>Loading...</div>
    ) : (
      <>
        <Nav>
          {user && (
            <>
              {loggedin && (
                <>
                  <WelcomeMessage>
                    Welcome, <span style={{ color: 'red' }}>{user?.username}</span>
                  </WelcomeMessage>
                  <Link href="/" passHref>
                    Home
                  </Link>
                </>
              )}
              {user && !loggedin && (user.role === 'usurper' || user.role === 'admin') && (
                <Link href="/register" passHref>
                  Register
                </Link>
              )}
              {loggedin && <NavLink onClick={handleLogout}>Logout</NavLink>}
            </>
          )}
        </Nav>
      </>
    )}
  </div>
);
};
export default Navbar;