import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    error: null,
    loggedIn: false,
    token: null,
    userId: null
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
                isLoading: false,
                loggedIn: true,
                token: action.token,
                userId: action.userId
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
                userId: null
            }

        case actionTypes.AUTH_AUTO_LOGIN:
            return {
                ...state,
                loggedIn: true,
                token: action.token,
                userId: action.userId
            }


        default:
            return state;
    }
}

export default reducer