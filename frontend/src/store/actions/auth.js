import axios from '../../axios-api'

import * as actionTypes from './actionTypes'
import { errorToText } from '../utility'

const authSigninStart = () => {
    return {
        type: actionTypes.AUTH_SIGNIN_START
    }
}

const authSigninSuccess = (token, userId) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('userId', userId)
    return {
        type: actionTypes.AUTH_SIGNIN_SUCCESS,
        token: token,
        userId: userId
    }
}

const authSigninFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.AUTH_SIGNIN_FAIL,
        error: error
    }
}

export const authAutoLogin = () => {
    const token = sessionStorage.getItem('token')
    const userId = sessionStorage.getItem('userId')
    if (token && userId)
        return {
            type: actionTypes.AUTH_AUTO_LOGIN,
            token: token,
            userId: +userId
        }
    else return {
        type: actionTypes.AUTH_AUTO_LOGIN_FAIL,
    }
}

export const authSignin = (name, email, password, signin) => dispatch => {
    dispatch(authSigninStart())
    let user = null
    if (signin) {
        user = { name: name, email: email, password: password }
        axios
            .post('api/user/create/', user)
            .then(res => dispatch(authSigninSuccess(res.data.token, parseInt(res.data.user.id))))
            .catch(err => dispatch(authSigninFail(err.response.data)))
    }
    else {
        user = { email: email, password: password }
        axios
            .post('api/user/token/', user)
            .then(res => {
                dispatch(authSigninSuccess(res.data.token, parseInt(res.data.id)))
            })
            .catch(err => dispatch(authSigninFail(err.response.data)))
    }
}

export const authLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
