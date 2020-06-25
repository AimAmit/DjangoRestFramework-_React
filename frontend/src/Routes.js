import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Recipes from './components/Recepies/Recipes'
import UserInfo from './components/UserInfo/UserInfo'
import Auth from './components/Auth/Auth'
import User from './components/User/User'
import Recipe from './components/Recepies/Recipe/Recipe'
import CreateRecipe from './components/UserInfo/CreateRecipe/CreateRecipe'
import Logout from './components/Auth/Logout/Logout'
import { connect } from 'react-redux'

const Routes = props => {

    const routes = props.loggedIn
        ?
        <Switch>
            <Route path='/user' component={UserInfo} />
            <Route path='/logout' component={Logout} />
            <Route path='/userDetail' component={User} />
            <Route path='/recipe/:id' component={Recipe} />
            <Route path='/createRecipe' component={CreateRecipe} />
            <Route path='/' component={Recipes} />
        </Switch>
        :
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/recipe/:id' component={Recipe} />
            <Route path='/' component={Recipes} />
        </Switch>

    return routes
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Routes)
