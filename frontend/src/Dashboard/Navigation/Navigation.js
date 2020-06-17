import React, { Fragment } from 'react'
import { connect } from 'react-redux'


import classes from './Navigation.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import Sidedrawer from '../Sidedrawer/Sidedrawer'

const Navigation = React.memo(props => {

    const navList = props.loggedIn
        ?
        <Fragment>
            <NavigationItem to='/' exact>Feed</NavigationItem>
            <NavigationItem to='/createRecipe' >Create Recipe</NavigationItem>
            <NavigationItem to='/user'>User</NavigationItem>
            <NavigationItem to='/logout'>Logout</NavigationItem>
        </Fragment>
        :
        <Fragment>
            <NavigationItem to='/' exact>Feed</NavigationItem>
            <NavigationItem to='/auth' >Authenticate</NavigationItem>
        </Fragment>


    return (
        <Fragment >
            <header className={classes.Navbar}>
                <div className={classes.Sidedrawer} >
                    <Sidedrawer />
                </div>
                <div className={classes.Rasoi}>RASOI</div>
                <nav className={classes.Menu}>
                    {navList}
                </nav>
            </header>
            <main style={{ marginTop: '60px' }}>
                {props.children}
            </main>
        </Fragment>
    )
})

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Navigation)
