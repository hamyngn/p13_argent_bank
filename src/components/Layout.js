import * as React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/argentBankLogo.png';
import {ReactComponent as SignInIcon} from '../assets/images/circle-user-solid.svg';

const Layout = () => {
    return (
      <>
        <header className = {styles.flexRow}>
          <div className = {styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo}/>
          </div>
          <nav>
            <NavLink to="/user/login" className = {styles.navLink}>
            <SignInIcon className={styles.loginIcon}/> <span className={styles.signIn}>Sign In</span>
            </NavLink>
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
  