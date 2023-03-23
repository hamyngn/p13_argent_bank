import axios from "axios"

const API_URL = "http://localhost:3001/api/v1/user/login";

const login = (email, password) => {
    const user = {email: email, password: password}
    axios.post(API_URL, user)
        .then((response) => {
        if (response.data.body.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data)
        return response.data }
        )
        .catch(error => {
            console.error(error)
        })
    
  };

  export default {
    login
  };