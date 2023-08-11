import * as React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/argentBankLogo.png';
import { ReactComponent as SignInIcon } from "../assets/images/circle-user-solid.svg";
import { ReactComponent as LogOutIcon } from "../assets/images/right-from-bracket-solid.svg";
import { useSelector } from 'react-redux';
import { logout } from "../redux/actions/actions";
import {fetchUserRequest} from "../redux/actions/actions"
import { useEffect } from 'react';
import { connect } from 'react-redux'

const Layout = (props) => {
  const {isLoggedIn} = useSelector(state => state.auth)
  const {user, loading} = useSelector(state => state.profile)

  let navigate = useNavigate();

  useEffect (() => {
    if(isLoggedIn) {
      props.fetchUser()
    }
  }, [props, isLoggedIn])

  const handleLogOut = () => {
    props.signOut()
    navigate('/')
  };

    return (
      <>
        <header className = {styles.flexRow}>
          <div className = {styles.logoContainer}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logo}/>
            </Link>
          </div>
          <nav>
            {!isLoggedIn && 
            <NavLink to="/user/login" className = {styles.navLink}>
              <SignInIcon className={styles.icon}/> <span>Sign In</span>
            </NavLink>
            }
            {isLoggedIn && !loading && user &&
            <>
            <div className={styles.profile}>
              <NavLink to="/user/profile" className = {styles.navLink}>
              <SignInIcon className={styles.icon}/> <span>{user.firstName}</span>
              </NavLink>
            </div>
            <div onClick={() => handleLogOut()} className={styles.logout}>
            <LogOutIcon className={styles.icon}/> <span className={styles.signOut}>Sign Out</span>
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

  const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUserRequest()),
    signOut: () => dispatch(logout())
  })
  
  export default connect(null, mapDispatchToProps)(Layout)