import axios from "axios";

const request = new axios.create({
    baseURL: 'https://xr4ftiodp6.execute-api.eu-central-1.amazonaws.com/dev'
})

export default request
