/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-30 11:01:49
 *
 * LastModified: 2017-07-30 11:01:53
 *-------------------------------------------------------*/

export function toggleMessageBox(payload, next) {
	return {
		type: 'TOGGLE_MESSAGE_BOX',
		payload,
		next
	};
}
