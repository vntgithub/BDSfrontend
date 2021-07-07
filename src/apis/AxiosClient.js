import axios from "axios";

const AxiosClient = axios.create(
    {
        baseURL: 'http://localhost:8080/',
        timeout: 1000,
        headers: {'Access-Control-Allow-Origin': true}
    }
)

export default AxiosClient;