import axios from "axios"

const API_URL = "http://localhost:3001/api/v1/user/login";

const login = async (email, password) => {
    const user = {email: email, password: password}
    let data;
    await axios.post(API_URL, user)
        .then((response) => {
            if (response.data.body.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            data = response.data
            }
        )
        .catch(error => {
            console.error(error)
        })
        return data;
  };

const logout = () => {
    localStorage.removeItem("user");
};

const exportedObject = {
    login,
    logout,
};

export default exportedObject;