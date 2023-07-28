import * as React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Layout.module.css'
import logo from '../assets/images/argentBankLogo.png';
import {ReactComponent as SignInIcon} from '../assets/images/circle-user-solid.svg';
import { useSelector } from 'react-redux';
import {ReactComponent as SignOutIcon} from '../assets/images/right-from-bracket-solid.svg';
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
      {loading && <div>Loading...</div>}
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
            {isLoggedIn && !loading && user &&
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

  const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUserRequest()),
    signOut: () => dispatch(logout())
  })
  
  export default connect(null, mapDispatchToProps)(Layout)