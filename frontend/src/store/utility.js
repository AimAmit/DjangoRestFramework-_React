export const errorToText = error => {
    let errorText = ''
    if (typeof (error) === 'object') {
        for (let key in error) {
            errorText += error[key]
            errorText += '\n'
        }
    }
    else if (error.constructor === Array) {
        for (let el of error) {
            errorText += el.join('\n')
        }
    }
    else errorText = error

    return errorText
}