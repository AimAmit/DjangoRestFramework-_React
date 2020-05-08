import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'

import classes from './User.module.css'
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
            placeholder: 'Your Name',
            label: 'Your Name'
        }
    },
    gender: {
        name: 'gender',
        type: 'options',
        config: {
            type: 'text',
            label: 'Gender',
            options: [
                { value: 'M', displayValue: 'Male' },
                { value: 'F', displayValue: 'Female' }
            ]
        }
    },
    age: {
        name: 'age',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'Age',
            label: 'Age',
        },
        rules: {
            isNumeric: true
        }
    },
    password: {
        name: 'password',
        type: 'input',
        config: {
            type: 'password',
            placeholder: 'Enter old/new Password',
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
            placeholder: 'Password',
            label: 'Confirm New Password'
        },
        validationRequired: true,
        rules: {
            minLength: 6,
            confirmPassword: true
        },
    }
}


const User = React.memo(props => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const validForm = useState({
        password: false,
        conPassword: false,
    })

    useEffect(() => {
        props.userDetailsReset()
        props.userDetailsFetch()
    }, [])

    useEffect(() => {
        if (props.userDetails) {
            setName(props.userDetails.name)
            setAge(props.userDetails.age)
            setGender(props.userDetails.sex)
        }
    }, [props.userDetails])

    let allValid = true;

    for (let key in validForm[0]) {
        allValid = allValid && validForm[0][key]
    }

    const submitButtonHandler = () => {
        const email = props.userDetails ? props.userDetails.email : null
        const user = {
            name: name,
            age: age === '' ? null : +age,
            sex: gender,
            password: password
        }
        props.userDetailsCreate(user)
    }

    if (props.createResponse) props.history.goBack()

    let inputArea = (
        <Fragment>
            <Input value={name} setValue={setName} validForm={validForm} {...inputConfig.name} />
            <Input value={gender} setValue={setGender} validForm={validForm} {...inputConfig.gender} />
            <Input value={age} setValue={setAge} validForm={validForm} {...inputConfig.age} />
            <Input value={password} setValue={setPassword} validForm={validForm} {...inputConfig.password} />
            <Input value={conPassword} setValue={setConPassword} validForm={validForm} {...inputConfig.conPassword} />

            <Button buttontype='success' disabled={allValid ? 0 : 1} onClick={submitButtonHandler} >
                Update
            </Button>
        </Fragment>
    )

    if (props.userDetailsLoading || props.userCreateLoading) inputArea = <Spinner />


    let errorMessage = null
    if (props.userDetailsError) errorMessage = props.userDetailsError
    if (props.userCreateError) errorMessage = props.userCreateError

    return (
        <div className={classes.Container}>
            <h3 style={{ marginTop: '10px' }} >Your Detail</h3>
            <hr />
            <h5>{props.userDetails ? props.userDetails.email : null}</h5>
            {errorMessage ? errorMessage : inputArea}
        </div>
    )
})

const mapStateToProps = state => {
    return {
        userDetails: state.user.userDetails,
        userDetailsLoading: state.user.userDetailsLoading,
        userDetailsError: state.user.userDetailsError,
        createResponse: state.user.createResponse,
        userCreateLoading: state.user.userCreateLoading,
        userCreateError: state.user.userCreateError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userDetailsFetch: () => dispatch(actions.userDetailsFetch()),
        userDetailsCreate: (user) => dispatch(actions.userDetailsCreate(user)),
        userDetailsReset: () => dispatch(actions.userDetailsReset()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
