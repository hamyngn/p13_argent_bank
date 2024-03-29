import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import styles from "../assets/styles/SignInPage.module.css"
import { loginRequest } from "../redux/actions/actions";
import { ReactComponent as SignInIcon } from "../assets/images/circle-user-solid.svg";
import { connect } from 'react-redux'

const SignInPage = (props) => {
    const form = useRef();

    let navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null)

    const {isLoggedIn} = useSelector(state => state.auth);
    const { error } = useSelector(state => state.auth);
 
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true);
        props.login({email, password})
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

    useEffect(() => {
        if(error) {
            setLoading(false)
            setMessage("Password is not correct")
        } else {
            setMessage(null)
        }
    },[setLoading, error])

    return (
    <div className={styles.bgDark}>
        <section className={styles.signInContent}>
            <div style={{display: "flex", justifyContent: "center"}}>
            <SignInIcon className={styles.signInIcon}/>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
            <h1>Sign In</h1>
            </div>
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

const mapDispatchToProps = (dispatch) => {
    return  {
        login: (email, password) => dispatch(loginRequest(email, password)),
    }
  }
  
export default connect(null, mapDispatchToProps)(SignInPage)