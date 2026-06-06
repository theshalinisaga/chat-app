import axios from "axios";

const API = axios.create({

       baseURL: "https://chat-app-backend-3qjv.onrender.com/api"

});

export default API;