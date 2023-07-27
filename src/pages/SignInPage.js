import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import styles from "../assets/styles/SignInPage.module.css"
import {ReactComponent as SignInIcon} from '../assets/images/circle-user-solid.svg';
import { loginRequest } from "../redux/actions/actions";

const SignInPage = () => {
    const form = useRef();

    let navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();
 
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true);
        dispatch(loginRequest({email, password}))
    }

    useEffect(() => {
        const ifLoggedIn = () => {
            if (isLoggedIn) {
                navigate("/user/profile")
                setLoading(false)
            }
        }
        ifLoggedIn()
    }, [isLoggedIn, navigate])

    return (
    <div className={styles.bgDark}>
        <section className={styles.signInContent}>
            <SignInIcon className={styles.signInIcon} />
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} ref={form}>
            <div className={styles.inputWrapper}>
                <label htmlFor="username">Username</label>
                <input 
                type="email" 
                id="username" 
                required
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                id="password"
                required 
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className={styles.inputRemember}>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {message && (
              <div role="alert">
                {message}
              </div>
          )}
            <button disabled={loading} type="submit" className={styles.signInButton}>
                {loading ? 'Signing In' : 'Sign In'}
            </button>
            </form>
        </section>
    </div>
    )
}

export default SignInPage