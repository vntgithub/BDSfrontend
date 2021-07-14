import AxiosClient from "./AxiosClient";

const filterApi = {
    add: (filterObject) => {
        AxiosClient.post("filter", filterObject)
    }
}

export default filterApi;