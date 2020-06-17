import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './SidedrawerItem.module.css'

const SidedrawerItem = React.memo(props => {
    return (
        <li className={classes.SidedrawerItem}>
            <NavLink to={props.to} exact={props.exact} activeClassName={classes.active} state={null}>
                {props.children}
            </NavLink>
        </li>
    )
})

export default SidedrawerItem
