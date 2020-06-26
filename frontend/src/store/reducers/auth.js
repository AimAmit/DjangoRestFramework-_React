import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    error: null,
    loggedIn: false,
    token: null,
    tokenRefresh: null,

    userId: null,
    refreshExp: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SIGNIN_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case actionTypes.AUTH_SIGNIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                isLoading: false,
                token: action.token,
                userId: action.userId,
                tokenRefresh: action.tokenRefresh,
                refreshExp: action.refreshExp
            }

        case actionTypes.AUTH_SIGNIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                loggedIn: false,
                token: null,
                tokenRefresh: null,
                userId: null,
                refreshExp: null
            }

        case actionTypes.AUTH_AUTO_LOGIN:
            return {
                ...state,
                loggedIn: true,
                token: action.token,
                userId: action.userId,
                tokenRefresh: action.tokenRefresh,
                refreshExp: action.refreshExp
            }


        default:
            return state;
    }
}

export default reducer