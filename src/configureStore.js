/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 23:35:03
*------------------------------------------------------- */

import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import logger from 'redux-logger';

import reducer from './reducers';
import dataSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const config = {
	key: 'rencity',
	blacklist: ['loader', 'form', 'messageBox'],
	storage: AsyncStorage,
};

export default function configureStore(onCompletion) {
	const reducers = persistCombineReducers(config, reducer);

	const enhancer = compose(
		applyMiddleware(sagaMiddleware),
		applyMiddleware(logger),
	);

	const store = createStore(reducers, enhancer);

	// then run the saga
	sagaMiddleware.run(dataSaga);

	persistStore(store, null, onCompletion);

	// if (typeof onCompletion === 'function') {
	// 	onCompletion(store);
	// }

	return store;
}
