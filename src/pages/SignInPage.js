import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import styles from "../assets/styles/SignInPage.module.css"
import {ReactComponent as SignInIcon} from '../assets/images/circle-user-solid.svg';
import { login } from "../redux/actions/actions";

const SignInPage = () => {
    const form = useRef();

    let navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = useState(false);

/*     const { isLoggedIn } = useSelector(state => state.login); */
/*     const { message } = useSelector(state => state.message); */

    const dispatch = useDispatch();
 
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true);
        dispatch(login(email, password))
    }

/*     if (isLoggedIn) {
        navigate("/user/profile");
    } */
 
    return (
    <div className={styles.bgDark}>
        <section className={styles.signInContent}>
            <SignInIcon className={styles.signInIcon} />
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} ref={form}>
            <div className={styles.inputWrapper}>
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
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
{/*             {message && <div>{message}</div>} */}
            <button /* disabled={loading} */ type="submit" className={styles.signInButton}>
                {loading ? 'Signing In' : 'Sign In'}
            </button>
            </form>
        </section>
    </div>
    )
}

export default SignInPage