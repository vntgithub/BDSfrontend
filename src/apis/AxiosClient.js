import axios from "axios";

const AxiosClient = axios.create(
    {
        baseURL: process.env.REACT_APP_URL_BACKEND,
        timeout: 1000,
        headers: {'Access-Control-Allow-Origin': true}
    }
)

export default AxiosClient;