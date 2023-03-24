import React from "react"
import { useSelector } from "react-redux";
import getUser from "../services/profileService";

const Profile = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const [user, setUser] = React.useState({})
  
    const getProfile = () => {
    getUser().then(res => setUser(res))
    }
    React.useEffect (() => {
     if(isLoggedIn) getProfile();
    },[isLoggedIn])

return (
    <div>Hello {user.firstName}</div>
)
}

export default Profile