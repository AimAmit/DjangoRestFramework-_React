import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Navigation from './Dashboard/Navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import * as actions from './store/actions'



const App = React.memo(props => {

  useEffect(() => {
    props.autoLogin()
  }, [props])

  return (
    <BrowserRouter>
      <Navigation>
        <Routes />
      </Navigation>

    </BrowserRouter>
  )
})

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.authAutoLogin())
  }
}

export default connect(null, mapDispatchToProps)(App);
