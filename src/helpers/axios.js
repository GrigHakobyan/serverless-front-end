import axios from "axios";
import UserPool from "./cognito/userPool";

const request = new axios.create({
    baseURL: 'https://n5uzeawyf4.execute-api.eu-central-1.amazonaws.com/dev/'
})

request.interceptors.request.use(
    config => {
        let token

        UserPool.getCurrentUser().getSession((error, session) => {
            token = session.getIdToken().getJwtToken()
        })

        config.headers.Authorization = token

        return config
    },
    error => {
        console.log(error)
    }
)

export default request
