import axios from 'axios'

let header = sessionStorage.getItem('token') ?
    { Authorization: `Token ${sessionStorage.getItem('token')}` } : null

let instance = axios.create({
    baseURL: '/',
})

instance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')

    config.headers.Authorization = token ? `Token ${token}` : ''
    return config
})

export default instance