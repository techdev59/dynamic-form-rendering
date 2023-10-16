// Axios Instance
import axios from "axios";

// Baseurl for the api's & server accessibilty
export const BASEURL = import.meta.env.VITE_BASEURL;

// axios Instance
export const apiClient = axios.create({
    baseURL: BASEURL,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
    }
);
