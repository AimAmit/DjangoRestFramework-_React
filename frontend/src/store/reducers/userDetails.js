import * as actionTypes from '../actions/actionTypes'

const initialStates = {
    tags: [],
    tagsLoading: false,
    tagsError: null,

    ingredients: [],
    ingredientsLoading: false,
    ingredientsError: null,

    recipes: [],
    recipesLoading: false,
    recipesError: null,

    fetchFavouriteRecipes: [],
    fetchFavouriteRecipesLoading: false,
    fetchFavouriteRecipesError: null,


    userDetails: null,
    userDetailsLoading: false,
    userDetailsError: null,

    createResponse: null,
    userCreateLoading: false,
    userCreateError: null
}

const reducer = (state = initialStates, action) => {
    switch (action.type) {
        case actionTypes.USER_DETAILS_RESET:
            return {
                ...state,
                createResponse: null,
            }


        case actionTypes.USER_TAGS_FETCH_START:
            return {
                ...state,
                tagsLoading: true,
                tagsError: null
            }
        case actionTypes.USER_TAGS_FETCH_SUCCESS:
            return {
                ...state,
                tagsLoading: false,
                tags: action.tags
            }
        case actionTypes.USER_TAGS_FETCH_FAIL:
            return {
                ...state,
                tagsLoading: false,
                tagsError: action.error
            }

        case actionTypes.USER_INGREDIENTS_FETCH_START:
            return {
                ...state,
                ingredientsLoading: true,
                ingredientsError: null
            }
        case actionTypes.USER_INGREDIENTS_FETCH_SUCCESS:
            return {
                ...state,
                ingredientsLoading: false,
                ingredients: action.ingredients
            }
        case actionTypes.USER_INGREDIENTS_FETCH_FAIL:
            return {
                ...state,
                ingredientsLoading: false,
                ingredientsError: action.error
            }


        case actionTypes.USER_RECIPES_FETCH_START:
            return {
                ...state,
                recipesLoading: true,
                recipesError: null
            }
        case actionTypes.USER_RECIPES_FETCH_SUCCESS:
            return {
                ...state,
                recipesLoading: false,
                recipes: action.recipes
            }
        case actionTypes.USER_RECIPES_FETCH_FAIL:
            return {
                ...state,
                recipesLoading: false,
                recipesError: action.error
            }

        case actionTypes.USER_FAVOURITES_FETCH_START:
            return {
                ...state,
                fetchFavouriteRecipesLoading: true,
                fetchFavouriteRecipesError: null
            }
        case actionTypes.USER_FAVOURITES_FETCH_SUCCESS:
            return {
                ...state,
                fetchFavouriteRecipesLoading: false,
                fetchFavouriteRecipes: action.fetchFavouriteRecipes
            }
        case actionTypes.USER_FAVOURITES_FETCH_FAIL:
            return {
                ...state,
                fetchFavouriteRecipesLoading: false,
                fetchFavouriteRecipesError: action.error
            }



        case actionTypes.USER_DETAILS_FETCH_START:
            return {
                ...state,
                userDetailsLoading: true,
                userDetailsError: null
            }
        case actionTypes.USER_DETAILS_FETCH_SUCCESS:
            return {
                ...state,
                userDetailsLoading: false,
                userDetails: action.user
            }
        case actionTypes.USER_DETAILS_FETCH_FAIL:
            return {
                ...state,
                userDetailsLoading: false,
                userDetailsError: action.error
            }

        case actionTypes.USER_DETAILS_CREATE_START:
            return {
                ...state,
                userCreateLoading: true,
                userCreateError: null
            }
        case actionTypes.USER_DETAILS_CREATE_SUCCESS:
            return {
                ...state,
                userCreateLoading: false,
                createResponse: action.createResponse
            }
        case actionTypes.USER_DETAILS_CREATE_FAIL:
            return {
                ...state,
                userCreateLoading: false,
                userCreateError: action.error
            }

        default:
            return state;
    }
}

export default reducer