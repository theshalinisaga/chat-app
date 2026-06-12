import axios from "axios";

const API = axios.create({

       baseURL: "https://chat-appbackend-u7x3.onrender.com"

});

export default API;