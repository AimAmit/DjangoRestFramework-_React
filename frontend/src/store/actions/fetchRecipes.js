import axios from '../../axios-api'
import * as actionTypes from './actionTypes'
import { errorToText } from '../utility'

const recipesFetchStart = () => {
    return {
        type: actionTypes.RECIPES_FETCH_START
    }
}
const recipesFetchSuccess = recipes => {
    return {
        type: actionTypes.RECIPES_FETCH_SUCCESS,
        recipes: recipes
    }
}
const recipesFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.RECIPES_FETCH_FAIL,
        error: error
    }
}
export const recipesFetch = () => dispatch => {
    dispatch(recipesFetchStart())
    axios
        .get('recipes/')
        .then(res => dispatch(recipesFetchSuccess(res.data)))
        .catch(err => dispatch(recipesFetchFail(err.response.data)))
}


const recipeFetchStart = () => {
    return {
        type: actionTypes.RECIPE_FETCH_START
    }
}
const recipeFetchSuccess = recipe => {

    return {
        type: actionTypes.RECIPE_FETCH_SUCCESS,
        recipe: recipe
    }
}
const recipeFetchFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.RECIPE_FETCH_FAIL,
        error: error
    }
}

export const recipeFetch = id => dispatch => {
    dispatch(recipeFetchStart())
    axios
        .get(`recipes/${id}/`)
        .then(res => dispatch(recipeFetchSuccess(res.data))
        )
        .catch(err => {
            console.log(err.response);

            dispatch(recipeFetchFail(err.response.data))
        })
}


const recipeDeleteStart = () => {
    return {
        type: actionTypes.RECIPE_DELETE_START
    }
}
const recipeDeleteSuccess = () => {
    return {
        type: actionTypes.RECIPE_DELETE_SUCCESS
    }
}
const recipeDeleteFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.RECIPE_DELETE_FAIL,
        error: error
    }
}

export const recipeDelete = id => dispatch => {
    dispatch(recipeDeleteStart())
    axios
        .delete(`recipes/${id}/`)
        .then(res => dispatch(recipeDeleteSuccess(res.data)))
        .catch(err => dispatch(recipeDeleteFail(err.response.data)))
}