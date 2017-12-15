/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-30 11:03:37
 *
 * LastModified: 2017-07-30 11:03:37
 *-------------------------------------------------------*/

export default function (state = { isOpen: false, message: '', type: '' }, action) {
	switch (action.type) {
		case 'TOGGLE_MESSAGE_BOX':
			return { isOpen: !state.isOpen, ...action.payload };
		default:
			return state;
	}
}
