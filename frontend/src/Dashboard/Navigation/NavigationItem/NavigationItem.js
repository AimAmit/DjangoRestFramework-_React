import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

const NavigationItem = React.memo(props => {

    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.to} exact={props.exact} activeClassName={classes.active} state={null}>
                {props.children}
            </NavLink>
        </li>
    )
})

export default NavigationItem
