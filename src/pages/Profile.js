import React, { useEffect, useState } from "react"
import profileService from "../services/profileService";
import styles from "../assets/styles/Profile.module.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../redux/actions/actions";
import { connect } from 'react-redux'

const Profile = (props) => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [showUpdate, setShowUpdate] = useState(false)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)

    let navigate = useNavigate()

    useEffect (() => {
    if (isLoggedIn === true) {
        profileService.getUser().then(res => {
            setFirstName(res.firstName)
            setLastName(res.lastName)
            setLoading(false)
        })
    } else {
        navigate("/user/login")
    }
    },[isLoggedIn, navigate])

    const displayUpdate = () => {
        setShowUpdate(true)
    }

    const hideUpdate = () => {
        setShowUpdate(false)
    }

    const handleUpdate = () => {
      props.updateName(firstName, lastName)
    }

return (
    <>
    {loading && <div>Loading...</div>}
    <div className={styles.container}>
    <div className={styles.header}>
    <h1 className={styles.welcome}>Welcome back</h1>
        {!showUpdate &&
        <>
        <div>
            <h1 className={styles.name}>{firstName} {lastName}</h1>
            <button className={styles.editButton} onClick={displayUpdate}>Edit Name</button>
        </div>
        </>
        }
        {showUpdate &&
        <div className={styles.updateInput}>
        <form onSubmit={handleUpdate}>
        <label htmlFor="firstname"></label>
            <input 
            type="text" 
            id="firstname" 
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            style={{marginRight: "10px"}}
            />
        <label htmlFor="lastname"></label>
            <input 
            type="text" 
            id="lastname" 
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            />
        <div className={styles.buttonContainer}>
        <button className={styles.editButton} style={{marginRight: "10px"}} type="submit">Save</button>
        <button className={styles.editButton} onClick={hideUpdate}>Cancel</button>
        </div>
        </form>
        
        </div>
        }
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

const mapDispatchToProps = {
  updateName: update,
}

export default connect(null, mapDispatchToProps)(Profile)