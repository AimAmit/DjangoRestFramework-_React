import axios from 'axios'

const token = sessionStorage.getItem('token')

let instance = axios.create({
    baseURL: '/'
})

if (token)
    instance = axios.create({
        baseURL: '/',
        headers: {
            Authorization: `Token ${token}`
        }
    })

export default instance