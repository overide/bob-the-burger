import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-orders.js';

export const addIngredient = (ingType) => {
	return {
		type:actionTypes.ADD_INGREDIENT,
		value:ingType
	}
}

export const removeIngredient = (ingType) => {
	return {
		type:actionTypes.REMOVE_INGREDIENT,
		value:ingType
	}
}

export const setIngredients = (ingredients) => {
	return {
		type:actionTypes.SET_INGREDIENTS,
		value:ingredients
	}
}

export const fetchIngredientFailed = () => {
	return {
		type:actionTypes.FETCH_INGREDIENTS_FAILED,
		value:'true'
	}
}

export const initIngredient = ()=>{
	return dispatch => {
		axios.get('/ingredients.json')
		.then(response => {
			dispatch(setIngredients(response.data))
		})
		.catch(error => {
			dispatch(fetchIngredientFailed())
		});
	}
}