import React from 'react'

import classes from './Backdrop.module.css'

const Backdrop = props => {

    if (!props.display) return null

    return (
        <div className={classes.Backdrop} onClick={() => props.setDisplay(prev => !prev)} />
    )
}

export default Backdrop
