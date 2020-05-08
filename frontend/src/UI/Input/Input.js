import React, { useState } from 'react'

import classes from './Input.module.css'


let password = ''

const validitate = (value, rules) => {

    if (!rules) {
        return true;
    }

    let isValid = true

    if ('email' in rules) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if ('isNumeric' in rules) {
        const pattern = /^[0-9]+(\.[0-9]{1,2})?$/;
        isValid = (pattern.test(value) || value === '') && isValid
    }

    if ('required' in rules) {
        isValid = value.trim() !== '' && isValid;
    }

    if ('minLength' in rules) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ('maxLength' in rules) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ('notNull' in rules) {
        isValid = value.length && isValid
    }

    if ('confirmPassword' in rules) {
        isValid = value === password && isValid
    }

    return isValid
}


const Input = React.memo(props => {

    const [touched, setTouched] = useState(false)
    const [error, setError] = useState(false)

    const [validForm, setValidForm] = props.validForm

    const onChangehandler = (event, name, rules) => {
        props.setValue(event.target.value)
        setTouched(true)

        let isValid = validitate(event.target.value, rules)
        setError(!isValid)

        if (props.validationRequired)
            setValidForm(prevState => ({
                ...prevState,
                [name]: isValid
            }))

        if (name === 'password') password = event.target.value
    }

    const focusChangeHandler = () => {
        if (props.setFocus !== undefined)
            props.setFocus(prev => true)
    }
    const blurChangeHandler = () => {
        if (props.setFocus !== undefined) {
            setTimeout(() => {
                props.setFocus(prev => false)
            }, 500)
        }
    }

    let inputElement = null
    let className = [classes.Input]


    if (props.rules && touched && error) {
        className.push(classes.Invalid)
    }

    switch (props.type) {
        case 'input':
            inputElement = (
                <input
                    className={className.join(' ')}
                    type={props.config.type}
                    value={props.value}
                    onChange={(event) => onChangehandler(event, props.name, props.rules)}
                    onFocus={focusChangeHandler}
                    onBlur={blurChangeHandler}
                    {...props.config} />
            )
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={className.join(' ')}
                    value={props.value}
                    onChange={onChangehandler} {...props} />
            )
            break;
        case 'options':
            inputElement = (
                <select
                    className={className.join(' ')}
                    value={props.value}
                    onChange={onChangehandler} >
                    {props.config.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;

        default:
            break;
    }



    return (
        <div className={classes.Container}>
            <label>{props.config.label} </label>{inputElement}
        </div>
    )
})

export default Input
