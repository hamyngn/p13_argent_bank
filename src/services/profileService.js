import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3031/api/v1/user/"

const getUserBoard = () => {
    return axios.get(API_URL + "profile", { headers: authHeader() });
};

export default getUserBoard 