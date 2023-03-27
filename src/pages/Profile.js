import React, { useEffect, useState } from "react"
import getUser from "../services/profileService";
import styles from "../assets/styles/Profile.module.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate();

    useEffect (() => {
    if (isLoggedIn === true) {
        getUser().then(res => {
            setUser(res);
            setLoading(false)
        })      
    } else {
        navigate("/user/login")
    }
    },[isLoggedIn, navigate])

return (
    <>
    {loading && <div>Loading...</div>}
    <div className={styles.container}>
    <div className={styles.header}>
        <h1>Welcome back<br />{user.firstName} {user.lastName}</h1>
        <button className={styles.editButton}>Edit Name</button>
      </div>
      <h2 className={styles.srOnly}>Accounts</h2>
      <section className={styles.account}>
        <div className={styles.accountContentWrapper}>
          <h3 className={styles.accountTitle}>Argent Bank Checking (x8349)</h3>
          <p className={styles.accountAmount}>$2,082.79</p>
          <p className={styles.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={styles.accountContentWrapperCta}>
          <button className={styles.transactionButton}>View transactions</button>
        </div>
      </section>
      <section className={styles.account}>
        <div className={styles.accountContentWrapper}>
          <h3 className={styles.accountTitle}>Argent Bank Savings (x6712)</h3>
          <p className={styles.accountAmount}>$10,928.42</p>
          <p className={styles.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={styles.accountContentWrapperCta}>
          <button className={styles.transactionButton}>View transactions</button>
        </div>
      </section>
      <section className={styles.account}>
        <div className={styles.accountContentWrapper}>
          <h3 className={styles.accountTitle}>Argent Bank Credit Card (x8349)</h3>
          <p className={styles.accountAmount}>$184.30</p>
          <p className={styles.accountAmountDescription}>Current Balance</p>
        </div>
        <div className={styles.accountContentWrapperCta}>
          <button className={styles.transactionButton}>View transactions</button>
        </div>
      </section>
      </div>
      </>
)
}

export default Profile