import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type:actionTypes.AUTH_START
	}
}

export const authSuccess = (idToken, localId) => {
	return {
		type:actionTypes.AUTH_SUCCESS,
		token: idToken,
		userId: localId
	}
}

export const authFail = (error) => {
	return {
		type:actionTypes.AUTH_FAILED,
		error:error
	}
}

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type:actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(()=>{
			dispatch(logout());
		}, expirationTime*1000)
	}
}

export const auth = (email,password,mode) => {
	return dispatch => {
		dispatch(authStart());
		// Put your firebase project API key here
		const API_KEY = "";
		let AUTH_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
		if(mode === 'signin')
			AUTH_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`
		let authData = {
			email:email,
			password:password,
			returnSecureToken:true
		}
		axios.post(AUTH_URL,authData)
		.then(response => {
			let expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
			localStorage.setItem("token",response.data.idToken);
			localStorage.setItem("expirationDate",expirationDate);
			localStorage.setItem("userId",response.data.localId);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(error => {
			console.log(error);
			dispatch(authFail(error));
		})
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if(!token){
			dispatch(logout());
		}else{
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			const userId = localStorage.getItem("userId");
			if(expirationDate <= new Date()){
				dispatch(logout());
			}else{
				const expiresInSeconds = Math.round(
					(expirationDate.getTime() - new Date().getTime())/1000
				)
				dispatch(authSuccess(token,userId));
				dispatch(checkAuthTimeout(expiresInSeconds));
			}
		}
	}
}