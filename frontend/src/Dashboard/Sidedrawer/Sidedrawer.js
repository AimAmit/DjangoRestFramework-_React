import React, { useState, Fragment } from 'react'

import classes from './Sidedrawer.module.css'
import SidedrawerItem from './SidedrawerItem/SidedrawerItem';
import { connect } from 'react-redux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedrawer = React.memo(props => {

    const [drawer, setDrawer] = useState(false)

    let menuClass = [classes.Menu]
    if (drawer) menuClass.push(classes.active)

    const navList = props.loggedIn
        ?
        <Fragment>
            <SidedrawerItem to='/' exact>Feed</SidedrawerItem>
            <SidedrawerItem to='/createRecipe' >Create Recipe</SidedrawerItem>
            <SidedrawerItem to='/user'>User</SidedrawerItem>
            <SidedrawerItem to='/logout'>Logout</SidedrawerItem>
        </Fragment>
        :
        <Fragment>
            <SidedrawerItem to='/' exact>Feed</SidedrawerItem>
            <SidedrawerItem to='/auth' >Authenticate</SidedrawerItem>
        </Fragment>

    return (
        <Fragment>
            <div className={menuClass.join(' ')} onClick={() => setDrawer(prev => !prev)} >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <Backdrop display={drawer} setDisplay={setDrawer} />

            <div className={classes.Sidedrawer} style={{ transform: drawer ? 'translateX(0)' : 'translateX(-100%)' }} >

                <div className={classes.List} onClick={() => setDrawer(prev => !prev)} >
                    {navList}
                </div>

                <div className={classes.About} >contacttoamitt00@gmail.com</div>
            </div>

        </Fragment>
    )
})

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Sidedrawer)
