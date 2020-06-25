import axios from '../../axios-api'
import * as actionTypes from './actionTypes'
import { errorToText } from '../utility'


export const recipeCreateResetState = () => {
    return {
        type: actionTypes.RECIPE_CREATE_RESET_ERROR
    }
}


export const setTagsIngredients = (tagsArray, ingredientsArray) => {
    return {
        type: actionTypes.SET_TAGS_INGREDIENTS,
        tagsArray: tagsArray,
        ingredientsArray: ingredientsArray
    }
}

export const tagCreateStart = () => {
    return {
        type: actionTypes.TAG_CREATE_START
    }
}
export const tagCreateSuccess = tag => {
    return {
        type: actionTypes.TAG_CREATE_SUCCESS,
        tag: tag
    }
}
export const tagCreateFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.TAG_CREATE_FAIL,
        error: error
    }
}
export const tagRemove = id => {
    return {
        type: actionTypes.TAG_REMOVE,
        id: id
    }
}
export const tagAdd = tag => {
    return {
        type: actionTypes.TAG_ADD,
        tag: tag
    }
}

export const tagCreate = tag => dispatch => {
    dispatch(tagCreateStart())
    axios
        .post('tags/', { name: tag })
        .then(res => dispatch(tagCreateSuccess(res.data)))
        .catch(err => dispatch(tagCreateFail(err.response.data)))
}

export const ingredientCreateStart = () => {
    return {
        type: actionTypes.INGREDIENT_CREATE_START
    }
}
export const ingredientCreateSuccess = ingredient => {
    return {
        type: actionTypes.INGREDIENT_CREATE_SUCCESS,
        ingredient: ingredient
    }
}
export const ingredientCreateFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.INGREDIENT_CREATE_FAIL,
        error: error
    }
}
export const ingredientRemove = id => {
    return {
        type: actionTypes.INGREDIENT_REMOVE,
        id: id
    }
}
export const ingredientAdd = ingredient => {
    return {
        type: actionTypes.INGREDIENT_ADD,
        ingredient: ingredient
    }
}

export const ingredientCreate = ingredient => dispatch => {
    dispatch(ingredientCreateStart())
    axios
        .post('ingredients/', { name: ingredient })
        .then(res => dispatch(ingredientCreateSuccess(res.data)))
        .catch(err => dispatch(ingredientCreateFail(err.response.data)))
}

export const recipeUploadImageStart = () => {
    return {
        type: actionTypes.RECIPE_UPLOAD_IMAGE_START
    }
}
export const recipeUploadImageSuccess = image => {
    return {
        type: actionTypes.RECIPE_UPLOAD_IMAGE_SUCCESS,
        image: image
    }
}
export const recipeUploadImageFail = imageError => {
    imageError = errorToText(imageError)
    return {
        type: actionTypes.RECIPE_UPLOAD_IMAGE_FAIL,
        imageError: imageError
    }
}

export const recipeUploadImage = (id, image) => dispatch => {
    dispatch(recipeUploadImageStart())
    let formData = new FormData();
    formData.append("image", image);

    axios
        .post(`recipes/${id}/upload-image/`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            }
        })
        .then(res => dispatch(recipeUploadImageSuccess(res.data)))
        .catch(err => dispatch(recipeUploadImageFail(err.response.data)))
}

export const recipeCreateStart = () => {
    return {
        type: actionTypes.RECIPE_CREATE_START
    }
}
export const recipeCreateSuccess = recipe => {
    return {
        type: actionTypes.RECIPE_CREATE_SUCCESS,
        recipe: recipe
    }
}
export const recipeCreateFail = error => {
    error = errorToText(error)
    return {
        type: actionTypes.RECIPE_CREATE_FAIL,
        error: error
    }
}

export const recipeCreate = (recipe, patch, image) => dispatch => {
    dispatch(recipeCreateStart())


    if (patch) {
        axios
            .patch(`recipes/${recipe.id}/`, recipe)
            .then(res => {
                dispatch(recipeCreateSuccess(res.data))
                if (image) dispatch(recipeUploadImage(res.data.id, image))
            })
            .catch(err => dispatch(recipeCreateFail(err.response.data)))
    }

    else {
        axios
            .post('recipes/', recipe)
            .then(res => {
                dispatch(recipeCreateSuccess(res.data))
                if (image) dispatch(recipeUploadImage(res.data.id, image))
            })
            .catch(err => dispatch(recipeCreateFail(err.response.data)))
    }
}


