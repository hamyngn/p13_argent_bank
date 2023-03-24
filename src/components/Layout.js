import * as React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/argentBankLogo.png';
import {ReactComponent as SignInIcon} from '../assets/images/circle-user-solid.svg';
import { useDispatch, useSelector } from 'react-redux';
import {ReactComponent as SignOutIcon} from '../assets/images/right-from-bracket-solid.svg';
import getUser from '../services/profileService';
import { logout } from "../redux/actions/actions";

const Layout = () => {
  const {isLoggedIn} = useSelector(state => state.auth)
  const [user, setUser] = React.useState({})

  const dispatch = useDispatch()
  let navigate = useNavigate();

  const getProfile = () => {
  getUser().then(res => setUser(res))
  }
  React.useEffect (() => {
   if(isLoggedIn) getProfile();
  },[isLoggedIn])

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/')
  };

    return (
      <>
        <header className = {styles.flexRow}>
          <div className = {styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo}/>
          </div>
          <nav>
            {!isLoggedIn && 
            <NavLink to="/user/login" className = {styles.navLink}>
            <SignInIcon className={styles.loginIcon}/> <span className={styles.signIn}>Sign In</span>
            </NavLink>
            }
            {isLoggedIn &&
            <>
            <div className={styles.name}>
            <SignInIcon className={styles.loginIcon}/> <span>{user.firstName}</span>
            </div>
            <div onClick={() => handleLogOut()}>
            <SignOutIcon className={styles.loginIcon}/> <span className={styles.signIn}>Sign Out</span>
            </div>
            </>
            }
          </nav>
        </header>
        <main style={{ padding: '1rem 0' }}>
          <Outlet />
        </main>
        <footer>
        <span>Copyright 2020 Argent Bank</span>
        </footer>
      </>
    );
  };
  export default Layout;
  