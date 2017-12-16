/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 23:36:49
*------------------------------------------------------- */

import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { take, call, put, cancel, fork, all } from 'redux-saga/effects';
import fetchApi, { uploadImage, deleteImage } from 'src/utils/FetchApi';

import AuthStorage from '../utils/AuthStorage';

function* authorize(email, password, next) {
	try {
		const response = yield call(fetchApi, 'users/login?include=user', { email, password }, { method: 'POST' }, true);
		if (response && !response.error) {
			const data = {
				token: response.id,
				userId: response.userId,
				loginType: response.user.loginType
			};
			yield call(AuthStorage.setValue, data, next);

			yield put({
				type: 'LOGIN_SUCCESS',
				payload: response.user
			});
		} else {
			yield put({
				type: 'LOGIN_FAILED',
				payload: response
			});
		}
	} catch (err) {
		console.log('err', err);
	}
}

function* loginFlow() {
	const INFINITE = true;

	while (INFINITE) {
		const { payload: { email, password }, next } = yield take('LOGIN_REQUEST');
		const authorizeTask = yield fork(authorize, email, password, next);
		const action = yield take(['LOGOUT_REQUEST', 'LOGIN_FAILED', 'REQUEST_ERROR']);

		if (action.type === 'LOGOUT_REQUEST') {
			yield cancel(authorizeTask);
		}
	}
}

function* loginGoogleFlow() {
	const INFINITE = true;

	while (INFINITE) {
		const { payload, next } = yield take('LOGIN_GOOGLE');
		try {
			const response = yield call(fetchApi, 'users/login-google', payload, { method: 'POST' });
			if (response && !response.error) {
				const data = {
					token: response.id,
					userId: response.userId,
					loginType: response.user.loginType
				};
				yield call(AuthStorage.setValue, data, next);

				yield put({
					type: 'LOGIN_SUCCESS',
					payload: response.user
				});
			} else {
				yield put({
					type: 'LOGIN_FAILED',
					payload: response
				});
			}
		} catch (err) {
			yield put({ type: 'REQUEST_ERROR', payload: err });
		}
	}
}

function* loginFacebookFlow() {
	const INFINITE = true;

	while (INFINITE) {
		const { payload, next } = yield take('LOGIN_FACEBOOK');
		try {
			const response = yield call(fetchApi, 'users/login-facebook', payload, { method: 'POST' });
			if (response && !response.error) {
				const data = {
					token: response.id,
					userId: response.userId,
					loginType: response.user.loginType
				};
				yield call(AuthStorage.setValue, data, next);

				yield put({
					type: 'LOGIN_SUCCESS',
					payload: response.user
				});
			} else {
				yield put({
					type: 'LOGIN_FAILED',
					payload: response
				});
			}
		} catch (err) {
			yield put({ type: 'REQUEST_ERROR', payload: err });
		}
	}
}

function* logoutFlow() {
	const INFINITE = true;

	while (INFINITE) {
		const { next } = yield take('LOGOUT_REQUEST');
		try {
			const response = yield call(fetchApi, 'users/logout', {}, { method: 'POST' });
			if (response && !response.error) {
				if (AuthStorage.loginType === 'facebook') {
					yield call(LoginManager.logOut);
				}
				if (AuthStorage.loginType === 'google') {
					GoogleSignin.signOut()
						.then(() => {
							console.log('out');
						})
						.catch((err) => {
							console.log('err', err);
						});
				}

				yield call(AuthStorage.destroy, next);

				yield put({ type: 'LOGOUT_SUCCESS' });
			}
		} catch (err) {
			yield put({ type: 'REQUEST_ERROR', payload: err });
		}
	}
}

export default function* authFlow() {
	yield fork(loginFlow);
	yield fork(loginGoogleFlow);
	yield fork(loginFacebookFlow);
	yield fork(logoutFlow);
}
