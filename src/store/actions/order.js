import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-orders.js';


export const purchaseBurgerStart = () => {
	return {
		type:actionTypes.PURCHASE_BURGER_START
	}
}

export const resetPurchaseStatus = () => {
	return {
		type:actionTypes.RESET_PURCHASE_STATUS
	}
}

export const purchaseBurgerSuccess = (orderId,orderData) => {
	return {
		type:actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId,
		orderData
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type:actionTypes.PURCHASE_BURGER_FAIL,
		error
	}
}

export const setOrders = (orders) => {
	return {
		type:actionTypes.SET_ORDERS,
		orders
	}
}

export const fetchOrdersStart = () => {
	return {
		type:actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrdersFailed = (error) => {
	return {
		type:actionTypes.FETCH_ORDERS_FAILED,
		error
	}
}

export const purchaseBurger = (orderData) => {
	return (dispatch,getState) => {
		let token = getState().auth.token;
		axios.post(`/orders.json?auth=${token}`,orderData)
        .then((response)=>{
           dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch((error)=>{
            dispatch(purchaseBurgerFail(error))
        })
	}
}

export const fetchOrders = (token) => {
	return (dispatch,getState) => {
			dispatch(fetchOrdersStart());
			let token = getState().auth.token;
			let userId = getState().auth.userId;
			const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
			axios.get(`/orders.json${queryParams}`)
	        .then(res => {
	        	let fetchedOrders = [];
	            for(let[orderId,orderData] of Object.entries(res.data)){
	                fetchedOrders.push(
	                    {...orderData,orderId:orderId}
	                );
	            }
	            dispatch(setOrders(fetchedOrders));
	        })
	        .catch(err => {
	            dispatch(fetchOrdersFailed());
	        })
	    }
}