import React from 'react'

import classes from './RecipeUnit.module.css'

const RecipeUnit = React.memo(props => {

    return (
        <div className={classes.Card} onClick={() => props.onClickHandler(props.id)}>
            <h3>{props.name}</h3>
            <div className={classes.Details}>

                <p>Preperation Time : {props.cookingTime} minutes</p>
                <p>Estimated Cost : ₹{props.price}</p>
                <div>By : {props.user.name}</div>
                {props.link ?
                    <div className={classes.Link}>Reference: {props.link}</div>
                    : null
                }
            </div>
        </div>
    )
})


export default RecipeUnit
