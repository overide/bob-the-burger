import * as actionTypes from '../actions/actionTypes'

const initialState = {
	token:null,
	userId:null,
	authError:null,
	authInProgress:false
}

const authSuccess = (state, action) => {
	return {
		...state,
		token:action.token,
		userId:action.userId,
		authError:null,
		authInProgress:false
	}
}

const authFailed = (state, action) => {
	return {
		...state,
		authError: action.error,
		authInProgress: false
	}
}

const authStart = (state, action) => {
	return {
		...state,
		authInProgress:true,
		authError:null
	}
}

const authLogout = (state, action) => {
	return {
		token:null,
		userId:null,
		authError:null,
		authInProgress:false
	}
}

const reducer = (state=initialState, action)=>{
	switch(action.type){
		case actionTypes.AUTH_START: return authStart(state,action)
		case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
		case actionTypes.AUTH_FAILED: return authFailed(state, action)
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
		default: return state
	}
}

export default reducer;