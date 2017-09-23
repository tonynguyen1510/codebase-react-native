/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-21 21:00:03
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

export function loginSocial(payload, next) {
	return {
		type: 'LOGIN_SOCIAL',
		payload,
		next
	};
}
