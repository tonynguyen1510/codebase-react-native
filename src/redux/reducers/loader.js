/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-16 00:43:23
*------------------------------------------------------- */

export default function (state = { sending: true }, action) {
	switch (action.type) {
		case 'TOGGLE_LOADING':
			return { sending: !state.sending };
		case 'START_LOADING':
			return { sending: true };
		case 'STOP_LOADING':
			return { sending: false };
		case 'REQUEST_ERROR':
			return { sending: false, error: action.payload };
		default:
			return state;
	}
}
