import * as React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/argentBankLogo.png';
import {ReactComponent as SignInIcon} from '../assets/images/circle-user-solid.svg';
import { useDispatch, useSelector } from 'react-redux';
import {ReactComponent as SignOutIcon} from '../assets/images/right-from-bracket-solid.svg';
import profileService from '../services/profileService';
import { logout } from "../redux/actions/actions";
import jwt_decode from "jwt-decode";
import authHeader from "../services/authHeader";

const Layout = () => {
  const {isLoggedIn} = useSelector(state => state.auth)
  const [user, setUser] = React.useState({})

  const dispatch = useDispatch()
  let navigate = useNavigate();

  if(isLoggedIn) {
    const token = authHeader();
      const decoded = jwt_decode(token)
      if (decoded.exp < new Date()/1000) {
          dispatch(logout());
      }
  }

  React.useEffect (() => {
   if (isLoggedIn) {
    profileService.getUser().then(res => setUser(res))
   }
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
            <SignInIcon className={styles.icon}/> <span>Sign In</span>
            </NavLink>
            }
            {isLoggedIn &&
            <>
            <div className={styles.profile}>
            <SignInIcon className={styles.icon}/> <span className={styles.name}>{user.firstName}</span>
            </div>
            <div onClick={() => handleLogOut()} className={styles.logout}>
            <SignOutIcon className={styles.icon}/> <span className={styles.signOut}>Sign Out</span>
            </div>
            </>
            }
          </nav>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
        <footer>
        <span>Copyright 2020 Argent Bank</span>
        </footer>
      </>
    );
  };
  export default Layout;
  