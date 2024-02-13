import axios from "axios";
import store from '../store/index'

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 5000
})

instance.interceptors.request.use((config) => {
    const token = store.getState().session.token
    if(token){
        config.headers.Authorization = token
    }
    return config
},(error) => {
        return Promise.reject(error)
    }
)

export default instance