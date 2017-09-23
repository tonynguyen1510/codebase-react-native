
/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-20 16:58:36
 *
 * LastModified: 2017-07-20 16:58:36
 *-------------------------------------------------------*/

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import App from './app';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import { toggleLoader } from './actions/loader';

function setup() {
	class Root extends Component {
		state = {
			store: configureStore(() => {
				console.log('rehydration complete');
				this.state.store.dispatch(toggleLoader());
			}),
		}

		render() {
			return (
				<StyleProvider style={getTheme(material)}>
					<Provider store={this.state.store}>
						<App />
					</Provider>
				</StyleProvider>
			);
		}
	}

	return Root;
}

export default setup;
