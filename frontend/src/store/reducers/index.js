import { combineReducers } from "redux";
import auth from "./auth";
import recipe from './fetchRecipes'
import createRecipe from './createRecipes'
import userReducer from './userDetails'

const rootReducer = combineReducers({
    auth: auth,
    recipe: recipe,
    createRecipe: createRecipe,
    user: userReducer,
})

export default rootReducer