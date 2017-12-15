/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2017-07-29 20:40:38
 *-------------------------------------------------------*/

export function loginRequest(payload, next) {
	return {
		type: 'LOGIN_REQUEST',
		payload,
		next
	};
}

export function logoutRequest(next) {
	return {
		type: 'LOGOUT_REQUEST',
		next
	};
}

export function loginGoogle(payload, next) {
	return {
		type: 'LOGIN_GOOGLE',
		payload,
		next
	};
}

export function loginFacebook(payload, next) {
	return {
		type: 'LOGIN_FACEBOOK',
		payload,
		next
	};
}
