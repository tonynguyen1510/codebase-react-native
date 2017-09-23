
/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-20 17:01:39
 *
 * LastModified: 2017-07-20 17:01:39
 *-------------------------------------------------------*/

import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';

import reducer from './reducers';
import dataSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(onCompletion) {
	const enhancer = compose(
		applyMiddleware(sagaMiddleware),
		applyMiddleware(logger),
		autoRehydrate()
	);

	const store = createStore(reducer, enhancer);

	// then run the saga
	sagaMiddleware.run(dataSaga);

	persistStore(store, { blacklist: ['loader', 'form', 'messageBox'], storage: AsyncStorage }, onCompletion);

	return store;
}
