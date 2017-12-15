/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-20 15:58:17
 *
 * LastModified: 2017-07-20 15:58:17
 *-------------------------------------------------------*/


import { fork } from 'redux-saga/effects';

import auth from './auth';

export function* startup() {
	yield console.log('Hello Redux-Saga');
}

export default function* root() {
	// combine your saga here
	yield fork(startup);
	yield fork(auth);
}
