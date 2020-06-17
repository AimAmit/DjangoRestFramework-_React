import React, { useState } from 'react'
import { connect } from 'react-redux'

import arrow from '../../assets/images/arrow.png'
import classes from './UserInfo.module.css'
import * as actions from '../../store/actions'
import Spinner from '../../UI/Spinner/Spinner'

export const UserInfo = React.memo(props => {
    const [showTags, setShowTags] = useState(false)
    const [showIngredients, setShowIngredients] = useState(false)
    const [showRecipes, setShowRecipes] = useState(false)
    const [showFavourites, setShowFavourites] = useState(false)

    const tagListButtonHandler = () => {
        setShowTags(prevState => !prevState)
        if (!props.tags.length) props.userTagsFetch()
    }
    let tagList = props.tags.map(tag => (
        <li key={tag.id} >
            {tag.name}
        </li>
    ))

    if (!tagList.length) tagList = <p>You Don't have any Tags.</p>
    if (props.tagsLoading) tagList = <Spinner />

    const ingredientListButtonHandler = () => {
        setShowIngredients(prevState => !prevState)
        if (!props.ingredients.length) props.userIngredientsFetch()
    }
    let ingredientList = props.ingredients.map(ingredient => (
        <li key={ingredient.id} >
            {ingredient.name}
        </li>
    ))
    if (!ingredientList.length) ingredientList = <p>You Don't have any Ingredients.</p>
    if (props.ingredientsLoading) ingredientList = <Spinner />

    const recipeClickHandler = id => {
        props.history.push('/recipe', id)
    }
    const recipeListButtonHandler = () => {
        setShowRecipes(prevState => !prevState)
        if (!props.recipes.length) props.userRecipesFetch()
    }
    let recipeList = props.recipes.map(recipe => (
        <li key={recipe.id} onClick={() => recipeClickHandler(recipe.id)} >
            {recipe.title}
        </li>
    ))
    if (!recipeList.length) recipeList = <p>You Don't have any Recipe. Start adding to list.</p>
    if (props.recipesLoading) recipeList = <Spinner />

    const favouriteListButtonHandler = () => {
        setShowFavourites(prevState => !prevState)
        if (!props.fetchFavouriteRecipes.length) props.userFavouritesFetch()
    }
    let favouriteList = props.fetchFavouriteRecipes.map(recipe => (
        <li key={recipe.id} onClick={() => recipeClickHandler(recipe.id)} >
            {recipe.title}
        </li>
    ))
    if (!favouriteList.length) favouriteList = <p>You Don't have any favourites Recipe.</p>
    if (props.fetchFavouriteRecipesLoading) favouriteList = <Spinner />

    return (
        <div className={classes.DropDown}>
            <div onClick={() => props.history.push('/userDetail')}>
                Edit Profile
            </div>

            <div onClick={favouriteListButtonHandler}>
                Your favourites
                <img className={!showFavourites ? classes.RotateCC : classes.RotateC}
                    alt='arrow' src={arrow} style={{ float: 'right' }} />
            </div>
            <ul style={{ display: showFavourites ? 'block' : 'none' }}>
                {props.fetchFavouriteRecipesError
                    ? props.fetchFavouriteRecipesError : favouriteList}
            </ul>

            <div onClick={recipeListButtonHandler}>
                Your Recipies
                <img className={!showRecipes ? classes.RotateCC : classes.RotateC}
                    alt='arrow' src={arrow} style={{ float: 'right' }} />
            </div>
            <ul style={{ display: showRecipes ? 'block' : 'none' }}>
                {props.recipesError ? props.recipesError : recipeList}
            </ul>


            <div onClick={ingredientListButtonHandler}>
                Your Ingredients
                <img className={!showIngredients ? classes.RotateCC : classes.RotateC}
                    alt='arrow' src={arrow} style={{ float: 'right' }} />
            </div>
            <ul style={{ display: showIngredients ? 'block' : 'none' }}>
                {props.ingredientsError ? props.ingredientsError : ingredientList}
            </ul>


            <div onClick={tagListButtonHandler}>
                Your Tags
                <img className={!showTags ? classes.RotateCC : classes.RotateC}
                    alt='arrow' src={arrow} style={{ float: 'right' }} />
            </div>
            <ul style={{ display: showTags ? 'block' : 'none' }}>
                {props.tagsError ? props.tagsError : tagList}
            </ul>
        </div>
    )
})

const mapStateToProps = state => {
    return {
        tags: state.user.tags,
        tagsLoading: state.user.tagsLoading,
        tagsError: state.user.tagsError,

        ingredients: state.user.ingredients,
        ingredientsLoading: state.user.ingredientsLoading,
        ingredientsError: state.user.ingredientsError,

        recipes: state.user.recipes,
        recipesLoading: state.user.recipesLoading,
        recipesError: state.user.recipesError,

        fetchFavouriteRecipes: state.user.fetchFavouriteRecipes,
        fetchFavouriteRecipesLoading: state.user.fetchFavouriteRecipesLoading,
        fetchFavouriteRecipesError: state.user.fetchFavouriteRecipesError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userTagsFetch: () => dispatch(actions.userTagsFetch()),
        userIngredientsFetch: () => dispatch(actions.userIngredientsFetch()),
        userRecipesFetch: () => dispatch(actions.userRecipesFetch()),
        userFavouritesFetch: () => dispatch(actions.userFavouritesFetch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
