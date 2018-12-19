import * as actionTypes from '../actions/actionTypes';
import * as purchaseStatus from './constants';

const INITIAL_STATE = {
	orders:[],
	placingOrderInProgress:false,
	purchaseStatus:purchaseStatus.PURCHASE_STATUS_NOT_INITIATED,
	fetchingOrdersFailed:false,
	fetchingOrdersInProgress:false
}

function purchaseBurgerSuccess(orderId, orderData, state){
	let updatedOrderList = state.orders;
	updatedOrderList.push({
		...orderData,
		orderId:orderId
	});
	return {
		...state,
		placingOrderInProgress:false,
		orders:updatedOrderList,
		purchaseStatus:purchaseStatus.PURCHASE_STATUS_SUCCESS
	}

}

const orderReducer = (state=INITIAL_STATE,action) => {

	switch(action.type){
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				placingOrderInProgress:true
			}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(action.orderId, action.orderData, state);
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				placingOrderInProgress:false,
				purchaseStatus:purchaseStatus.PURCHASE_STATUS_FAILED
			}
		case actionTypes.RESET_PURCHASE_STATUS:
			return {
				...state,
				purchaseStatus:purchaseStatus.PURCHASE_STATUS_NOT_INITIATED
			}
		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				fetchingOrdersInProgress:true
			}
		case actionTypes.SET_ORDERS:
			return {
				...state,
				orders:action.orders,
				fetchingOrdersFailed:false
			}
		case actionTypes.FETCH_ORDERS_FAILED:
			return {
				...state,
				fetchingOrdersFailed:true
			}
		default:
			return state
	}
}

export default orderReducer;