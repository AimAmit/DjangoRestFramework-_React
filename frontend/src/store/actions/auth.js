import axios from '../../axios-api'

import * as actionTypes from './actionTypes'
import { errorToText } from '../utility'


const checkTokenExpiary = exp => {
    if (exp > Date.now() / 1000) return true
    return false
}

const getPayloadFromToken = token => {
    if (token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.log(error);

        }
    }
    return null;
}

// const fetchTokenAfterExp = (token, tokenExp, refreshExp) => {
//     if(checkTokenExpiary(tokenExp)) {
//         const timer = setInterval(() => {

//         }, interval);({

//         }, tokenExp*1000-Date.now())
//     }
//     else if(checkTokenExpiary(refreshExp)){

//     }
// }

const authSigninStart = () => {
    return {
        type: actionTypes.AUTH_SIGNIN_START
    }
}

const authSigninSuccess = (token, tokenRefresh) => {
    localStorage.setItem('token', token)
    localStorage.setItem('token_refresh', tokenRefresh)

    let jwtPayload = getPayloadFromToken(token)
    return {
        type: actionTypes.AUTH_SIGNIN_SUCCESS,
        token: token,
        tokenRefresh: tokenRefresh,
        userId: jwtPayload.user_id,
        tokenExp: jwtPayload.exp,
        refreshExp: getPayloadFromToken(tokenRefresh).exp
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
    let tokenRefresh = localStorage.getItem('token_refresh')
    let jwtPayload = getPayloadFromToken(tokenRefresh)

    let refreshExp = null
    let userId = null

    if (tokenRefresh) {
        refreshExp = +jwtPayload.exp
        userId = +jwtPayload.user_id
    }
    if (refreshExp) refreshExp = +getPayloadFromToken(tokenRefresh).exp
    if (tokenRefresh && checkTokenExpiary(refreshExp)) {

        return {
            type: actionTypes.AUTH_AUTO_LOGIN,
            userId: +userId,
            tokenRefresh: tokenRefresh,
            refreshExp: refreshExp
        }
    }
    localStorage.removeItem('token')
    localStorage.removeItem('token_refresh')
    return {
        type: actionTypes.AUTH_AUTO_LOGIN_FAIL,
    }
}


export const authSignin = (name, email, password, signin) => dispatch => {
    dispatch(authSigninStart())
    let user = null
    if (signin) {
        user = { name: name, email: email, password: password }
        axios
            .post('user/create/', user)
            .then(res => dispatch(authSigninSuccess(res.data.access, parseInt(res.data.user.id))))
            .catch(err => dispatch(authSigninFail(err.response.data)))
    }
    else {
        user = { email: email, password: password }
        axios
            .post('user/token/', user)
            .then(res => dispatch(authSigninSuccess(res.data.access, res.data.refresh))
            )
            .catch(err => dispatch(authSigninFail(err.response.data)))
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('token_refresh')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
