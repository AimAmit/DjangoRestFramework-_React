import React from 'react'

import classes from './Button.module.css'

const Button = React.memo(props => {

    let className = [classes.Button]

    switch (props.buttontype) {
        case 'success':
            className.push(classes.Success)
            break;

        case 'danger':
            className.push(classes.Danger)
            break;

        default:
            break;

    }

    if (props.disabled) className.push(classes.Disable)

    return (
        <button className={className.join(' ')} {...props}>
            {props.children}
        </button>
    )
})

export default Button