/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-05-23 11:22:49
 *
 * LastModified: 2017-05-23 11:22:49
 *-------------------------------------------------------*/
import merge from 'lodash/merge';
import { put, call } from 'redux-saga/effects';

import constants from '../constants';
import AuthStorage from './AuthStorage';

const API_HOST = constants.API_HOST;

const fetching = (url, options) => fetch(API_HOST + url, options)
	.then(response => {
		return response.status === 204 || response.statusText === 'No Content' ? {} : response.json();
	})
	.then(json => {
		if (json.error) {
			throw json.error;
		} else {
			return json;
		}
	})
	.catch(err => {
		throw err;
	});

export const uploadImage = function* (url, params) {
	const options = {
		method: 'POST',
		headers: {},
		body: params
	};

	// set token
	if (AuthStorage.loggedIn) {
		options.headers.Authorization = AuthStorage.token;
	}

	yield put({ type: 'TOGGLE_LOADING' });

	let response;
	try {
		response = yield call(fetching, url, options);
		yield put({ type: 'TOGGLE_LOADING' });
	} catch (error) {
		response = { error };
		yield put({ type: 'REQUEST_ERROR', payload: error.message || error });
	}
	return response;
};

export const deleteImage = function* (container, file) {
	const options = {
		method: 'DELETE',
		headers: {}
	};

	// set token
	if (AuthStorage.loggedIn) {
		options.headers.Authorization = AuthStorage.token;
	}

	// if (params) {
	// 	//options.body = JSON.stringify(params);
	// }

	yield put({ type: 'TOGGLE_LOADING' });

	let response;
	try {
		response = yield call(fetching, `attachments/${container}/files/${file}`, options);
		yield put({ type: 'TOGGLE_LOADING' });
	} catch (error) {
		response = { error };
		// yield put({ type: 'REQUEST_ERROR', payload: error.message || error });
	}
	return response;
};

export default function* (uri, params, opt, noLoader) {
	const defaultOptions = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	};

	const options = merge(defaultOptions, opt);

	// set token
	if (AuthStorage.loggedIn) {
		options.headers.Authorization = AuthStorage.token;
	}

	let url = uri;

	if (params && Object.keys(params).length > 0) {
		if (options && options.method === 'GET') {
			url += '?' + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
		} else {
			options.body = JSON.stringify(params);
		}
	}

	if (!noLoader) {
		yield put({ type: 'TOGGLE_LOADING' });
	}

	let response;
	try {
		console.log(url, options);
		response = yield call(fetching, url, options);
		if (!noLoader) {
			yield put({ type: 'TOGGLE_LOADING' });
		}
	} catch (error) {
		response = { error };

		if (error.statusCode === 401 && (error.code === 'INVALID_TOKEN' || error.code === 'AUTHORIZATION_REQUIRED')) {
			yield call(AuthStorage.destroy);
			yield put({ type: 'LOGOUT_SUCCESS' });

			if (!noLoader) {
				yield put({ type: 'TOGGLE_LOADING' });
			}
		} else {
			if (!noLoader) {
				yield put({ type: 'REQUEST_ERROR', payload: error.message || error });
			}
		}
	}
	return response;
}
