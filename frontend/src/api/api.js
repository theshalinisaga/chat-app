import axios from "axios";
console.log("USING RENDER BACKEND 🚀");
const API = axios.create({
    baseURL: "https://chat-appbackend-u7x3.onrender.com"
});

export default API;