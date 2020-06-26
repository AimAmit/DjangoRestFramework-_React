import * as actionTypes from '../actions/actionTypes'

const initialState = {
    recipes: [],
    recipesLoading: false,
    recipesError: null,

    recipe: null,
    recipeLoading: false,
    recipeError: null,

    recipeDeleteLoading: false,
    recipeDeleteError: null,

    image: null,
    imageError: null,
    imageLoading: false,

    createFavouriteRecipeError: null,

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECIPES_FETCH_START:
            return {
                ...state,
                recipesLoading: true,
                recipesError: null,
            }

        case actionTypes.RECIPES_FETCH_SUCCESS:
            return {
                ...state,
                recipes: action.recipes,
                recipesLoading: false,
            }

        case actionTypes.RECIPES_FETCH_FAIL:
            return {
                ...state,
                recipesLoading: false,
                recipesError: action.error,
            }


        case actionTypes.RECIPE_FETCH_START:
            return {
                ...state,
                recipeLoading: true,
                recipeError: null,
            }

        case actionTypes.RECIPE_FETCH_SUCCESS:
            return {
                ...state,
                recipe: action.recipe,
                recipeLoading: false,
            }

        case actionTypes.RECIPE_FETCH_FAIL:
            return {
                ...state,
                recipeLoading: false,
                recipeError: action.error,
            }

        case actionTypes.RECIPE_DELETE_START:
            return {
                ...state,
                recipeDeleteLoading: true,
                recipeDeleteError: null,
            }

        case actionTypes.RECIPE_DELETE_SUCCESS:
            return {
                ...state,
                recipeDeleteLoading: false,
            }

        case actionTypes.RECIPE_DELETE_FAIL:
            return {
                ...state,
                recipeDeleteLoading: false,
                recipeDeleteError: action.error,
            }

        case actionTypes.RECIPE_IMAGE_FETCH_START:
            return {
                ...state,
                imageLoading: true,
                imageError: null,
            }

        case actionTypes.RECIPE_IMAGE_FETCH_SUCCESS:
            return {
                ...state,
                image: action.image,
                imageLoading: false,
            }

        case actionTypes.RECIPE_IMAGE_FETCH_FAIL:
            return {
                ...state,
                imageLoading: false,
                imageError: action.error,
            }

        case actionTypes.USER_FAVOURITES_CREATE_SUCCESS:
            return {
                ...state,
                createFavouriteRecipeError: null
            }
        case actionTypes.USER_FAVOURITES_CREATE_FAIL:
            return {
                ...state,
                createFavouriteRecipeError: action.error
            }

        default:
            return state;
    }
}

export default reducer