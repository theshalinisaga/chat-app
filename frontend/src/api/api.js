import axios from "axios";
console.log("USING RENDER BACKEND 🚀");
const API = axios.create({
    baseURL: "https://chat-app-backend-3qjv.onrender.com"
});

export default API;