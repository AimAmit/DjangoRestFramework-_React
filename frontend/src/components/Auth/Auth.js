import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'

import classes from './Auth.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import * as actions from '../../store/actions'
import Spinner from '../../UI/Spinner/Spinner'

const inputConfig = {
    name: {
        name: 'name',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'Full Name',
            label: 'Full Name'
        }
    },
    email: {
        name: 'email',
        type: 'input',
        config: {
            type: 'email',
            placeholder: 'Email id',
            label: 'Email id'
        },
        validationRequired: true,
        rules: {
            email: true
        }
    },
    password: {
        name: 'password',
        type: 'input',
        config: {
            type: 'password',
            placeholder: 'Password',
            label: 'Password'
        },
        validationRequired: true,
        rules: {
            minLength: 6
        },
    },
    conPassword: {
        name: 'conPassword',
        type: 'input',
        config: {
            type: 'password',
            placeholder: 'Confirm Password',
            label: 'Confirm Password'
        },
        validationRequired: true,
        rules: {
            minLength: 6,
            confirmPassword: true
        },
    }
}


const Auth = React.memo(props => {

    const [signIn, setSignIn] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const validForm = useState({
        email: false,
        password: false
    })

    let allValid = true

    for (let key in validForm[0]) {
        allValid = allValid && validForm[0][key]
    }

    const formSubmitHandler = event => {
        event.preventDefault()
        props.signinHandler(name, email, password, signIn)
    }

    let formInput = (
        <Fragment>
            {signIn ?
                <Input value={name} setValue={setName} validForm={validForm} {...inputConfig.name} />
                : null
            }
            <Input value={email} setValue={setEmail} validForm={validForm} {...inputConfig.email} />
            <Input value={password} setValue={setPassword} validForm={validForm} {...inputConfig.password} />
            {signIn ?
                <Input value={conPassword} setValue={setConPassword} validForm={validForm} {...inputConfig.conPassword} />
                : null
            }
        </Fragment>
    )

    if (props.loading) formInput = <Spinner />

    return (
        <div className={classes.Auth}>
            <h5>{props.error}</h5>
            <form onSubmit={formSubmitHandler}>
                {formInput}
                <Button type='submit' buttontype='success' disabled={allValid ? 0 : 1}>
                    {signIn ? 'Sign in' : 'Log in'}
                </Button>
            </form>
            <p onClick={() => setSignIn(prevState => !prevState)}>
                {signIn ? 'Already registered? Login..' : 'Create a new account'}
            </p>
        </div>
    )
})

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinHandler: (name, email, password, signIn) => dispatch(actions.authSignin(name, email, password, signIn)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)