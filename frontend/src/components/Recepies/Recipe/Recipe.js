import React, { Fragment, useEffect, useState } from 'react'

import DefaultImage from '../../../assets/images/default-thumbnail.jpg'
import classes from './Recipe.module.css'
import { connect } from 'react-redux'
import Spinner from '../../../UI/Spinner/Spinner'
import Button from '../../../UI/Button/Button'
import * as actions from '../../../store/actions'

const Recipe = React.memo(props => {
    const { recipe } = props
    const [renderRecipe, setRenderRecipe] = useState(null)
    const [favourites, setFavourites] = useState(false)
    const [recipeId, setRecipeId] = useState(null)


    useEffect(() => {
        setRecipeId(props.match.params.id)

    }, [props.match.params.id])

    useEffect(() => {
        if (recipeId) props.recipeFetch(recipeId)
    }, [recipeId])

    const editButtonClickHandler = () => {
        props.history.push('/createRecipe', recipe)
    }

    const deleteButtonClickHandler = () => {
        props.recipeDelete(recipeId)
        props.history.goBack('/', null)
    }

    const toggleFavouritesHandler = () => {
        setFavourites(prev => !prev)
        props.userFavouritesCreate(+recipeId)
    }

    let recipeData = null
    let tagList = null
    let ingredientList = null
    let Image = null


    useEffect(() => {
        if (recipe) {
            setFavourites(recipe.favourites);
        }
    }, [recipe])

    useEffect(() => {
        // if (props.imageLoading) Image = <Spinner />
        // else if (props.imageError) Image = props.imageError
        // else 
        if (recipe && recipe.image) Image = <img src={recipe.image} alt='Recipe' />
        else Image = <img src={DefaultImage} alt='Default' />

        if (recipe) {

            tagList = recipe.tags.map(tag => <li key={tag.id}>{tag.name}</li>)
            ingredientList = recipe.ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)

            recipeData = (
                <Fragment>

                    <h4>{recipe.title}</h4>
                    <hr style={{ margin: '2px' }} />
                    <div className={classes.Image}>
                        {Image}
                    </div>
                    <div className={classes.Details}>

                        <p>Preperation Time : {recipe.time_minutes} Minutes</p>
                        <p>Estimated Cost : ₹{recipe.price}</p>

                        <div className={classes.Tags}>
                            <h5>Tags</h5>
                            <hr />
                            <ul >
                                {tagList}
                            </ul>
                        </div>

                        <div className={classes.Tags}>
                            <h5>Ingredients</h5>
                            <hr />
                            <ul >
                                {ingredientList}
                            </ul>
                        </div>
                        <div>{recipe.user.name ? 'Added by : ' + recipe.user.name : null}</div>

                        {
                            recipe.link
                                ?
                                <a href={recipe.link} style={{ textDecoration: 'underline', color: '#0779e4' }}>Refrence (Click me!)</a>
                                :
                                null
                        }
                        {props.loggedin ?
                            props.createFavouriteRecipeError ? 'Something went wrong!'
                                : (
                                    <div style={{ textAlign: 'center' }} >
                                        <div className={favourites ? [classes.heart, classes.heart_active].join(' ') :
                                            [classes.heart, classes.heart_inactive].join(' ')}
                                            onClick={toggleFavouritesHandler} />
                                        <div>Add to Favourite '&#x2764;' </div>
                                    </div>
                                ) : null}

                        {props.currentUser == recipe.user.id
                            ?
                            <div>
                                <Button buttontype='success' onClick={editButtonClickHandler} >Edit</Button>
                                <Button buttontype='danger' onClick={deleteButtonClickHandler}>Delete</Button>
                            </div>
                            :
                            null
                        }
                    </div>
                </Fragment>
            )
            setRenderRecipe(recipeData)
        }
    }, [recipe, favourites, props.imageLoading, props.imageError, props.image])


    if (props.loading || props.recipeDeleteLoading) return <Spinner />

    if (props.recipeDeleteError) recipeData = props.recipeDeleteError
    if (props.error) recipeData = props.error

    return (
        <div className={classes.Container}>
            {renderRecipe}

        </div>
    )
})


const mapStateToProps = state => {
    return {
        recipe: state.recipe.recipe,
        loading: state.recipe.recipeLoading,
        error: state.recipe.recipeError,

        recipeDeleteLoading: state.recipe.recipeDeleteLoading,
        recipeDeleteError: state.recipe.recipeDeleteError,

        image: state.recipe.image,
        imageError: state.recipe.imageError,
        imageLoading: state.recipe.imageLoading,

        loggedin: state.auth.loggedIn,
        currentUser: state.auth.userId,

        createFavouriteRecipeError: state.recipe.createFavouriteRecipeError,
    }
}

const mapDispatchToprops = dispatch => {
    return {
        recipeFetch: (id) => dispatch(actions.recipeFetch(id)),
        recipeDelete: (id) => dispatch(actions.recipeDelete(id)),

        userFavouritesCreate: (id) => dispatch(actions.userFavouritesCreate(id))
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Recipe)
