/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-18 22:38:30
*------------------------------------------------------- */

import { takeEvery, call, put } from 'redux-saga/effects';

import fetchApi from 'src/utils/FetchApi';

export const SINGLE_API = Symbol('SINGLE_API');

function* callApi(action) {
	if (action.type === SINGLE_API) {
		/* payload sample
		{
			uri: ,
			params: ,
			opt: ,
			loading: ,
			uploadImg: ,
			successType: 'GET_CART_LIST_SUCCESS',
			afterSuccess: next,
			errorType: 'GET_CART_LIST_SUCCESS',
			afterError: next,
		}
		*/

		const { successType, afterSuccess, errorType, afterError, ...rest } = action.payload;

		try {
			const response = yield call(fetchApi, rest);

			if (response && !response.error) {
				if (successType) {
					yield put({ type: successType, payload: response });
				}

				if (typeof afterSuccess === 'function') {
					afterSuccess(response);
				}
			}
		} catch (err) {
			if (errorType) {
				yield put({ type: errorType, payload: err });
			}

			if (typeof afterError === 'function') {
				afterError(err);
			}

			yield put({ type: 'REQUEST_ERROR', payload: err });
		}
	}
}

export default function* () {
	yield takeEvery('*', callApi);
}