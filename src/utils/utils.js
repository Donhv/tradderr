import axios from "axios";
import logger from "../config/winston";

const callApi = (url) => new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
        resolve(res.data);
    }).catch(err => {
        reject(err);
    });
}).catch(err=> {
    logger.error(err);
});

export { callApi };