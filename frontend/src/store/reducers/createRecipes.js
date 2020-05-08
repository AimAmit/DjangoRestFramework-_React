import * as actionTypes from '../actions/actionTypes'

const initialStates = {
    tagLoading: false,
    tagError: null,
    tagsArray: [],
    ingredientLoading: false,
    ingredientError: null,
    ingredientsArray: [],
    recipeLoading: false,
    recipe: null,
    recipeError: null,
    image: null,
    imageLoading: false,
    imageError: null
}

const reducer = (state = initialStates, action) => {
    let tempArray = []
    switch (action.type) {
        case actionTypes.RECIPE_CREATE_RESET_ERROR:
            return {
                tagLoading: false,
                tagError: null,
                tagsArray: [],
                ingredientLoading: false,
                ingredientError: null,
                ingredientsArray: [],
                recipeLoading: false,
                recipe: null,
                recipeError: null,
                image: null,
                imageLoading: false,
                imageError: null
            }

        case actionTypes.SET_TAGS_INGREDIENTS:
            return {
                ...state,
                tagsArray: action.tagsArray,
                ingredientsArray: action.ingredientsArray
            }

        case actionTypes.TAG_CREATE_START:
            return {
                ...state,
                tagLoading: true,
                tagError: null
            }
        case actionTypes.TAG_CREATE_SUCCESS:
            tempArray = [...state.tagsArray]
            return {
                ...state,
                tagLoading: false,
                tagsArray: tempArray.concat(action.tag)
            }
        case actionTypes.TAG_CREATE_FAIL:
            return {
                ...state,
                tagLoading: false,
                tagError: action.error
            }
        case actionTypes.TAG_ADD:
            return {
                ...state,
                tagsArray: state.tagsArray.concat(action.tag)
            }
        case actionTypes.TAG_REMOVE:
            tempArray = [...state.tagsArray]
            tempArray.splice(action.id, 1)
            return {
                ...state,
                tagsArray: tempArray
            }

        case actionTypes.INGREDIENT_CREATE_START:
            return {
                ...state,
                ingredientLoading: true,
                ingredientError: null
            }
        case actionTypes.INGREDIENT_CREATE_SUCCESS:
            tempArray = [...state.ingredientsArray]
            return {
                ...state,
                ingredientLoading: false,
                ingredientsArray: tempArray.concat(action.ingredient)
            }
        case actionTypes.INGREDIENT_CREATE_FAIL:
            return {
                ...state,
                ingredientLoading: false,
                ingredientError: action.error
            }
        case actionTypes.INGREDIENT_REMOVE:
            tempArray = [...state.ingredientsArray]
            tempArray.splice(action.id, 1)
            return {
                ...state,
                ingredientsArray: tempArray
            }
        case actionTypes.INGREDIENT_ADD:
            return {
                ...state,
                ingredientsArray: state.ingredientsArray.concat(action.ingredient)
            }

        case actionTypes.RECIPE_CREATE_START:
            return {
                ...state,
                recipeLoading: true,
                recipeError: null
            }
        case actionTypes.RECIPE_CREATE_SUCCESS:
            return {
                ...state,
                recipeLoading: false,
                recipe: action.recipe
            }
        case actionTypes.RECIPE_CREATE_FAIL:
            return {
                ...state,
                recipeLoading: false,
                recipeError: action.error
            }

        case actionTypes.RECIPE_UPLOAD_IMAGE_START:
            return {
                ...state,
                imageLoading: true,
                imageError: null
            }
        case actionTypes.RECIPE_UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                imageLoading: false,
                image: action.image
            }
        case actionTypes.RECIPE_UPLOAD_IMAGE_FAIL:
            return {
                ...state,
                imageLoading: false,
                imageError: action.imageError
            }
        default:
            return state;
    }
}

export default reducer