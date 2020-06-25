import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';


const BASE_URL = '/api/'

let instance = axios.create({
    baseURL: BASE_URL
})


// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios
    .post(BASE_URL + 'user/token/refresh/',
        { refresh: localStorage.getItem('token_refresh') })
    .then(tokenRefreshResponse => {
        localStorage.setItem('token', tokenRefreshResponse.data.access);

        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
        return Promise.resolve();
    })
    .catch(err => {
        console.log(err.response.data);
        window.location = "logout";
        // actions.authLogout()
    })

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic);

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

export default instance