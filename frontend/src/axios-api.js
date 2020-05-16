import axios from 'axios'

let header = sessionStorage.getItem('token') ?
    { Authorization: `Token ${sessionStorage.getItem('token')}` } : null

let instance = axios.create({
    baseURL: '/',
    headers: header
})


export default instance