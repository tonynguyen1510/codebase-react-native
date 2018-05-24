/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2017-07-21 21:00:52
 *-------------------------------------------------------*/
const initialState = {
	userInfo: {},
}

function auth(state = { userInfo: initialState }, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return action.payload;
		case 'LOGIN_FAILED':
			return { error: action.payload.error || action.payload.error };
		case 'LOGOUT_SUCCESS':
			return initialState;
		default:
			return state;
	}
}

export default auth;
