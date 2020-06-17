import axios from '../../axios-api'
import * as actionTypes from './actionTypes'
import { errorToText } from '../utility'

const userTagsFetchStart = () => {
    return {
        type: actionTypes.USER_TAGS_FETCH_START
    }
}
const userTagsFetchSuccess = tags => {
    return {
        type: actionTypes.USER_TAGS_FETCH_SUCCESS,
        tags: tags
    }
}
const userTagsFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_TAGS_FETCH_FAIL,
        error: error
    }
}
export const userTagsFetch = () => dispatch => {
    dispatch(userTagsFetchStart())
    axios
        .get('api/recipe/tags/?mine=1')
        .then(res => dispatch(userTagsFetchSuccess(res.data)))
        .catch(err => dispatch(userTagsFetchFail(err.response.data)))
}



const userIngredientsFetchStart = () => {
    return {
        type: actionTypes.USER_INGREDIENTS_FETCH_START
    }
}
const userIngredientsFetchSuccess = ingredients => {
    return {
        type: actionTypes.USER_INGREDIENTS_FETCH_SUCCESS,
        ingredients: ingredients
    }
}
const userIngredientsFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_INGREDIENTS_FETCH_FAIL,
        error: error
    }
}
export const userIngredientsFetch = () => dispatch => {
    dispatch(userIngredientsFetchStart())
    axios
        .get('api/recipe/ingredients/?mine=1')
        .then(res => dispatch(userIngredientsFetchSuccess(res.data)))
        .catch(err => dispatch(userIngredientsFetchFail(err.response.data)))
}


const userRecipesFetchStart = () => {
    return {
        type: actionTypes.USER_RECIPES_FETCH_START
    }
}
const userRecipesFetchSuccess = recipes => {
    return {
        type: actionTypes.USER_RECIPES_FETCH_SUCCESS,
        recipes: recipes
    }
}
const userRecipesFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_RECIPES_FETCH_FAIL,
        error: error
    }
}
export const userRecipesFetch = () => dispatch => {
    dispatch(userRecipesFetchStart())
    axios
        .get('api/recipe/recipes/?mine=1')
        .then(res => dispatch(userRecipesFetchSuccess(res.data)))
        .catch(err => dispatch(userRecipesFetchFail(err.response.data)))
}


const userFavouritesFetchStart = () => {
    return {
        type: actionTypes.USER_FAVOURITES_FETCH_START
    }
}
const userFavouritesFetchSuccess = fetchFavouriteRecipes => {
    return {
        type: actionTypes.USER_FAVOURITES_FETCH_SUCCESS,
        fetchFavouriteRecipes: fetchFavouriteRecipes
    }
}
const userFavouritesFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_FAVOURITES_FETCH_FAIL,
        error: error
    }
}
export const userFavouritesFetch = () => dispatch => {
    dispatch(userFavouritesFetchStart())
    axios
        .get('api/user/recipes/')
        .then(res => dispatch(userFavouritesFetchSuccess(res.data.favourites)))
        .catch(err => dispatch(userFavouritesFetchFail(err.response.data)))
}



const userFavouritesCreateSuccess = () => {
    return {
        type: actionTypes.USER_FAVOURITES_CREATE_SUCCESS,
    }
}
const userFavouritesCreateFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_FAVOURITES_CREATE_FAIL,
        error: error
    }
}
export const userFavouritesCreate = recipeId => dispatch => {
    axios
        .patch(`api/user/recipes/`, { favourites: [{ 'id': recipeId }] })
        .then(res => dispatch(userFavouritesCreateSuccess()))
        .catch(err => dispatch(userFavouritesCreateFail(err.response.data)))
}

const userDetailsFetchStart = () => {
    return {
        type: actionTypes.USER_DETAILS_FETCH_START
    }
}
const userDetailsFetchSuccess = user => {
    return {
        type: actionTypes.USER_DETAILS_FETCH_SUCCESS,
        user: user
    }
}
const userDetailsFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_DETAILS_FETCH_FAIL,
        error: error
    }
}
export const userDetailsFetch = () => disptach => {
    disptach(userDetailsFetchStart())
    axios
        .get('api/user/me/')
        .then(res => disptach(userDetailsFetchSuccess(res.data)))
        .catch(err => disptach(userDetailsFetchFail(err.response.data.message)))
}

const userDetailsCreateStart = () => {
    return {
        type: actionTypes.USER_DETAILS_CREATE_START
    }
}
const userDetailsCreateSuccess = createResponse => {
    return {
        type: actionTypes.USER_DETAILS_CREATE_SUCCESS,
        createResponse: createResponse
    }
}
const userDetailsCreateFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.USER_DETAILS_CREATE_FAIL,
        error: error
    }
}
export const userDetailsCreate = user => disptach => {
    disptach(userDetailsCreateStart())
    axios
        .patch('api/user/me/', user)
        .then(res => disptach(userDetailsCreateSuccess(res.data)))
        .catch(err => disptach(userDetailsCreateFail(err.response.data)))
}


export const userDetailsReset = () => {
    return {
        type: actionTypes.USER_DETAILS_RESET
    }
}