import * as actionTypes from '../actions/actionTypes'

function isPurchasable(ingredients){
    let totalIngredients = Object.values(ingredients)
        .reduce((total,current)=>total+current,0);
    return totalIngredients > 0
}

function addIngredient(type,state){
	let oldCount = state.ingredients[type];
    let updatedCount = oldCount + 1;
    let updatedIngredients = {
        ...state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = state.ingredientPrice[type];
    let oldPrice = state.totalPrice;
    let newPrice = oldPrice + priceAddition;
    let purchasable = isPurchasable(updatedIngredients);
    let updatedState = {
    	...state,
    	totalPrice:newPrice,
        ingredients:updatedIngredients,
        purchasable
    }
    return updatedState;
}

function removeIngredient(type,state){
	let oldCount = state.ingredients[type];
	if(oldCount <= 0){
		return state;
	}
    let updatedCount = oldCount - 1;
    let updatedIngredients = {
        ...state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = state.ingredientPrice[type];
    let oldPrice = state.totalPrice;
    let newPrice = oldPrice - priceAddition;
    let purchasable = isPurchasable(updatedIngredients);
    let updatedState = {
    	...state,
    	totalPrice:newPrice,
        ingredients:updatedIngredients,
        purchasable
    }
    return updatedState;
}

function setIngredientsPrice(ings,state){
    let ingredientPrice = ings;
    let ingredients = {};
    for(let ing of Object.keys(ings))
        ingredients[ing] = 0;

    let updatedState = {
        ...state,
        ingredients,
        ingredientPrice,
        totalPrice:4
    }

    return updatedState;
}

function setFetchIngredientFailedError(error,state){
    return {
        ...state,
        ingredientFetchFailError:error
    }
}

const INITIAL_STATE = {
	totalPrice: 4,
	ingredients: null,
	ingredientPrice:null,
	purchasable:false,
    ingredientFetchFailError:false
}

const burgerBuilderReducer = (state=INITIAL_STATE,action) => {
	switch(action.type){
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(action.value, state);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(action.value, state)
        case actionTypes.SET_INGREDIENTS:
            return setIngredientsPrice(action.value, state)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return setFetchIngredientFailedError(action.value, state)
        default:
            return state
	}
}

export default burgerBuilderReducer;