import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loader from './loader';
import auth from './auth';
import messageBox from './messageBox';

export default combineReducers({
	form: formReducer,
	loader,
	messageBox,
	auth
});
