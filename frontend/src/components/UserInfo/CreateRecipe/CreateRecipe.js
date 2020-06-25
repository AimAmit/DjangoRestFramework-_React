import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-api'

import classes from './CreateRecipe.module.css'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import * as actions from '../../../store/actions'
import Spinner from '../../../UI/Spinner/Spinner'

const inputConfig = {
    title: {
        name: 'title',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'Title',
            label: 'Title'
        },
        validationRequired: true,
        rules: {
            notNull: true
        },
    },
    time: {
        name: 'time',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'time',
            label: 'Time (in minutes)'
        },
        validationRequired: true,
        rules: {
            isNumeric: true,
            notNull: true
        },
    },
    cost: {
        name: 'cost',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'cost',
            label: 'Estimated Cost'
        },
        validationRequired: true,
        rules: {
            isNumeric: true,
            notNull: true
        },
    },
    tags: {
        name: 'tags',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'Tag',
            label: 'Tag'
        },

    },
    ingredients: {
        name: 'ingredients',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'Ingredients',
            label: 'Ingredients'
        },

    },
    link: {
        name: 'link',
        type: 'input',
        config: {
            type: 'text',
            placeholder: 'Reference',
            label: 'Reference'
        },
    },
}

const CreateRecipe = React.memo(props => {

    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [cost, setCost] = useState('')
    const [link, setLink] = useState('')
    const [tag, setTag] = useState('')
    const [ingredient, setIngredient] = useState('')

    const tagFocus = useState(false)
    const ingredientFocus = useState(false)

    const [tagsSearchList, setTagsSearchList] = useState([{ id: -1, name: 'Click to add new!' }])
    const [ingredientsSearchList, setIngredientsSearchList] = useState([{ id: -1, name: 'Click to add new!' }])

    const [imageData, setImageData] = useState({ file: null, imagePreview: null })

    const validForm = useState({
        title: false,
        time: false,
        cost: false,
        tags: false,
        ingredients: false
    })

    let allValidInput = true
    for (let key in validForm[0]) allValidInput = validForm[0][key] && allValidInput

    useEffect(() => {
        return () => {
            props.recipeCreateResetState()
        }
    }, [])

    useEffect(() => {
        let location_title = ''
        let location_time = ''
        let location_price = ''
        if (props.location.state) {
            location_title = props.location.state.title
            location_time = props.location.state.time_minutes
            location_price = props.location.state.price
            setTitle(location_title)
            setTime(location_time)
            setCost(location_price)
            setLink(props.location.state.link)
            props.setTagsIngredients(props.location.state.tags, props.location.state.ingredients)

            if (location_title.length) validForm[1](prevState => ({ ...prevState, title: true }))
            if (location_time) validForm[1](prevState => ({ ...prevState, time: true }))
            if (location_price.length) validForm[1](prevState => ({ ...prevState, cost: true }))
            if (props.location.state.tags && props.location.state.tags.length)
                validForm[1](prevState => ({ ...prevState, tags: true }))
            if (props.location.state.ingredients && props.location.state.ingredients.length)
                validForm[1](prevState => ({ ...prevState, ingredients: true }))

        }

    }, [props.location])

    useEffect(() => {
        if (props.tagsArray.length) validForm[1]({ ...validForm[0], tags: true })
    }, [props.tagsArray])

    useEffect(() => {
        if (props.ingredientsArray.length) validForm[1]({ ...validForm[0], ingredients: true })
    }, [props.ingredientsArray])

    const addSearchItemsOnClick = (type, value) => {
        if (value.id == 'error') return;
        if (type === 'tag') {
            if (value.id === -1)
                props.tagCreate(tag)
            else props.tagAdd(value)
            setTag('')
        }
        else {
            if (value.id === -1)
                props.ingredientCreate(ingredient)
            else props.ingredientAdd(value)
            setIngredient('')
        }
    }

    let tagsSearchListRender = null
    let ingredientsSearchListRender = null

    useEffect(() => {
        const timer = setTimeout(() => {
            axios
                .get(`/tags/?search=${tag}`)
                .then(res => {
                    setTagsSearchList(prevState => [prevState[0], ...res.data])
                })
                .catch(err => {
                    setTagsSearchList(prevState => [prevState[0], { id: 'error', name: 'Something went wrong' }])
                })
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [tag])

    useEffect(() => {
        const timer = setTimeout(() => {
            axios
                .get(`/ingredients/?search=${ingredient}`)
                .then(res => {
                    setIngredientsSearchList(prevState => [prevState[0], ...res.data])
                })
                .catch(err => {
                    setIngredientsSearchList(prevState => [prevState[0], { id: 'error', name: 'Something went wrong' }])
                })
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [ingredient])

    tagsSearchListRender = tagsSearchList.map(tagSearch => (
        <li key={tagSearch.id} onClick={() => addSearchItemsOnClick('tag', tagSearch)} >
            {tagSearch.name}
        </li>
    ))

    ingredientsSearchListRender = ingredientsSearchList.map(ingredientSearch => (
        <li key={ingredientSearch.id} onClick={() => addSearchItemsOnClick('ingredient', ingredientSearch)}>
            {ingredientSearch.name}
        </li>
    ))

    const tagList = props.tagsArray.map((tag, i) => (
        <li key={tag.id} onClick={() => props.tagRemove(i)}>
            {tag.name}
        </li>
    ))
    const ingredientList = props.ingredientsArray.map((ingredient, i) => (
        <li key={ingredient.id} onClick={() => props.ingredientRemove(i)}>
            {ingredient.name}
        </li>
    ))

    if (props.recipe && (!imageData.file || props.image)) props.history.push('recipe', props.recipe.id)

    const imageChangeUploadHandler = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImageData({
                file: file,
                imagePreview: reader.result
            })
        }
        if (file) reader.readAsDataURL(file)
    }
    let prevImage = imageData.imagePreview ? <img src={imageData.imagePreview} alt='Preview' /> : null

    const recipeCreateButtonHandler = () => {
        const tagsId = []
        const ingredientsId = []
        for (let tag of props.tagsArray) tagsId.push(+tag.id)
        for (let ingredient of props.ingredientsArray) ingredientsId.push(+ingredient.id)
        let recipe = {
            title: title,
            time_minutes: +time,
            price: +cost,
            link: link,
            tags: tagsId,
            ingredients: ingredientsId,
            user: {
                name: ''
            }
        }
        if (props.location.state) recipe = { ...recipe, id: props.location.state.id }

        props.recipeCreate(recipe, props.location.state ? true : false, imageData.file)
    }

    if (props.recipeLoading || props.imageLoading) return <Spinner />
    if (props.recipeError) return <div>{props.recipeError}</div>
    if (props.imageError) return <div>{props.imageError}</div>

    return (
        <div className={classes.Container}>
            <Input value={title} setValue={setTitle} validForm={validForm} {...inputConfig.title} />
            <Input value={time} setValue={setTime} validForm={validForm} {...inputConfig.time} />
            <Input value={cost} setValue={setCost} validForm={validForm} {...inputConfig.cost} />
            <div className={classes.Tags} >
                <Input value={tag} setValue={setTag} validForm={validForm} setFocus={tagFocus[1]} {...inputConfig.tags} />
                {props.tagError ? props.tagError : null}
                {props.tagLoading ? (<Spinner />) : null}
                <ul className={classes.List}>
                    {tagList}
                    {tagFocus[0] ?

                        <ul className={classes.Search}>
                            {tagsSearchListRender}
                        </ul>
                        : null}
                </ul>
            </div>
            <div className={classes.Tags}>
                <Input value={ingredient} setValue={setIngredient} validForm={validForm} setFocus={ingredientFocus[1]} {...inputConfig.ingredients} />
                {props.ingredientError ? props.ingredientError : null}
                {props.ingredientLoading ? (<Spinner />) : null}
                <ul className={classes.List}>
                    {ingredientList}

                    {ingredientFocus[0] ?
                        <ul className={classes.Search}>
                            {ingredientsSearchListRender}
                        </ul>
                        : null}
                </ul>
            </div>
            <Input value={link} setValue={setLink} validForm={validForm} {...inputConfig.link} />

            <div className={classes.ImageInput}>
                <input type='file' onChange={(e) => imageChangeUploadHandler(e)} />
                {prevImage}
            </div>

            <Button buttontype='success' disabled={allValidInput ? 0 : 1} onClick={recipeCreateButtonHandler} >
                Submit
                </Button>
        </div>
    )
})

const mapStateToProps = (state) => {
    return {
        tagLoading: state.createRecipe.tagLoading,
        tagsArray: state.createRecipe.tagsArray,
        tagError: state.createRecipe.tagError,
        ingredientLoading: state.createRecipe.ingredientLoading,
        ingredientsArray: state.createRecipe.ingredientsArray,
        ingredientError: state.createRecipe.ingredientError,
        recipeLoading: state.createRecipe.recipeLoading,
        recipe: state.createRecipe.recipe,
        recipeError: state.createRecipe.recipeError,

        image: state.createRecipe.image,
        imageLoading: state.createRecipe.imageLoading,
        imageError: state.createRecipe.imageError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tagRemove: (id) => dispatch(actions.tagRemove(id)),
        ingredientRemove: (id) => dispatch(actions.ingredientRemove(id)),
        tagAdd: (tag) => dispatch(actions.tagAdd(tag)),
        ingredientAdd: (ingredient) => dispatch(actions.ingredientAdd(ingredient)),
        tagCreate: (tagName) => dispatch(actions.tagCreate(tagName)),
        ingredientCreate: (ingredientName) => dispatch(actions.ingredientCreate(ingredientName)),
        setTagsIngredients: (tagsArray, ingredientsArray) => dispatch(actions.setTagsIngredients(tagsArray, ingredientsArray)),
        recipeCreate: (recipe, patch, img) => dispatch(actions.recipeCreate(recipe, patch, img)),
        recipeUploadImage: (id) => dispatch(actions.recipeUploadImage(id)),
        recipeCreateResetState: () => dispatch(actions.recipeCreateResetState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)
