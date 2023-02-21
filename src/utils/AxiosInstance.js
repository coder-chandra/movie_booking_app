import axios from 'axios';
import {TIMEOUT, API_BASE_URL} from "../config/Config";

export const axiosInstance=axios.create({
    baseURL : API_BASE_URL,
    timeout : TIMEOUT
})