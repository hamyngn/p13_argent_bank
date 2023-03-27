import axios from "axios";
import authHeader from "../services/authHeader";

const API_URL = "http://localhost:3001/api/v1/user/profile";

const getUser = async () => {
    let user;
    const token = authHeader();
    await axios.get(API_URL, { headers: {'Authorization' : `Bearer ${token}` }})
    .then(res => user = res.data.body)
    .catch(error => console.log(error)); 

    return user;
}

const editUser = (firstName, lastName) => {
    const user = {
        firstName: firstName,
        lastName: lastName
    }
    
    const token = authHeader();
    axios.put(API_URL, user, { headers: {'Authorization' : `Bearer ${token}` }})
    .then(res=> console.log(res))
    .catch(error => console.log(error))

    return user;
}

const exportedObject = {
    getUser, 
    editUser
}
export default exportedObject;