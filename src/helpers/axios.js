import axios from "axios";
import {Auth} from "aws-amplify";

const request = new axios.create({
    baseURL: 'https://n5uzeawyf4.execute-api.eu-central-1.amazonaws.com/dev/'
})

request.interceptors.request.use(
    async config => {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken()

        config.headers.Authorization = token

        return config
    },
    error => {
        console.log(error)
    }
)

export default request
