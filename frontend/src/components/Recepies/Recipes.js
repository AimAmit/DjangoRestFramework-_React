import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import RecipeUnit from './RecipeUnit/RecipeUnit'
import * as actions from '../../store/actions'


const Recipes = React.memo(props => {

    useEffect(() => {

        if (!props.recipes || !props.recipes.length)
            props.recipesFetch()
    }, [])

    const onRecipeClickHandler = id => {
        props.history.push('/recipe', id)

    }
    let recipesList = null

    if (props.recipes)
        recipesList = props.recipes.map(recipe => (
            <RecipeUnit key={recipe.id} price={recipe.price} name={recipe.title}
                cookingTime={recipe.time_minutes} link={recipe.link}
                user={recipe.user}
                onClickHandler={() => onRecipeClickHandler(recipe.id)} />
        ))


    return (
        <div>
            {recipesList}
        </div>
    )
})

const mapStateToProps = (state) => {
    return {
        recipes: state.recipe.recipes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        recipesFetch: () => dispatch(actions.recipesFetch()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
