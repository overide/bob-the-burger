 export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength !== undefined && rules.minLength !== null){
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength !== undefined && rules.maxLength !== null){
        isValid = value.length <= rules.maxLength && isValid
    }
    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }
    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }
    return isValid;
}

export const configureInputs = (elementType,inputType,placeholder,value,validationRules={}) => {
    return {
        elementType:elementType,
        elementConfig:{
            type:inputType,
            placeholder:placeholder
        },
        validation:{
            rules:validationRules,
            valid:false
        },
        value:value,
        touched:false
    }
}

export const configureSelectInputs = (options,defaultValue='') => {
    return {
        elementType:'select',
        elementConfig:{
            options:options
        },
        value:defaultValue,
        touched:false
    }
}