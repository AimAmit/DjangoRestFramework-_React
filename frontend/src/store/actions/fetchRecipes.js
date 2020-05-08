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
        .get('api/recipe/recipes/')
        .then(res => dispatch(recipesFetchSuccess(res.data)))
        .catch(err => dispatch(recipesFetchFail(err.response.data)))
}


const recipeFetchStart = () => {
    return {
        type: actionTypes.RECIPE_FETCH_START
    }
}
const recipeFetchSuccess = recipe => {
    // console.log(recipe);

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
        .get(`api/recipe/recipes/${id}/`)
        .then(res => dispatch(recipeFetchSuccess(res.data)))
        .catch(err => dispatch(recipeFetchFail(err.response.data)))
}

const recipeImageFetchStart = () => {
    return {
        type: actionTypes.RECIPE_IMAGE_FETCH_START
    }
}
const recipeImageFetchSuccess = image => {
    return {
        type: actionTypes.RECIPE_IMAGE_FETCH_SUCCESS,
        image: image
    }
}
const recipeImageFetchFail = imageError => {
    imageError = errorToText(imageError)
    return {
        type: actionTypes.RECIPE_IMAGE_FETCH_FAIL,
        imageError: imageError
    }
}

export const recipeImageFetch = id => dispatch => {
    dispatch(recipeImageFetchStart())
    axios
        .get(`api/recipe/recipes/${id}/upload-image/`)
        .then(res => dispatch(recipeImageFetchSuccess(res.data)))
        .catch(err => dispatch(recipeImageFetchFail(err.response.data)))
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
        .delete(`api/recipe/recipes/${id}/`)
        .then(res => dispatch(recipeDeleteSuccess(res.data)))
        .catch(err => dispatch(recipeDeleteFail(err.response.data)))
}