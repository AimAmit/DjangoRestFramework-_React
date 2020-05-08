import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions'

const Logout = React.memo(props => {

    useEffect(() => {
        const timer = setTimeout(() => props.logoutHandler(), 500)

        return () => {
            clearTimeout(timer)
        }
    }, [props])



    return (
        <div style={{ margin: '10px auto', textAlign: 'center' }}>
            Logging out.....
        </div>
    )
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: () => dispatch(actions.authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
