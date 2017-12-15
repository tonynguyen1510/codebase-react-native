/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-16 00:42:57
*------------------------------------------------------- */

// import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import loader from './loader';
import auth from './auth';
import messageBox from './messageBox';

export default {
	form: formReducer,
	loader,
	messageBox,
	auth
};
