/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-30 10:55:29
 *
 * LastModified: 2017-07-30 10:55:29
 *-------------------------------------------------------*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
	Button,
	Text,
	Icon,
} from 'native-base';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import AuthStorage from '../../utils/AuthStorage';

import { loginSocial } from '../../actions/auth';
import { toggleMessageBox } from '../../actions/messageBox';

class FbBtnLogin extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		loginSocial: PropTypes.func.isRequired,
		toggleMessageBox: PropTypes.func.isRequired,
	}

	handleLoginFb = () => {
		LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
			if (result.isCancelled) {
				console.log('Login was cancelled');
			} else {
				AccessToken.getCurrentAccessToken().then(
					(data) => {
						const { accessToken } = data;

						const responseInfoCallback = (error, resultUser) => {
							if (error) {
								this.props.toggleMessageBox({
									message: `Error fetching data: ${error}`,
									type: 'error'
								});
							} else {
								const { picture, cover, id, link, name, ...user } = resultUser;

								user.avatar = resultUser.picture.data.url;
								user.cover = resultUser.cover.source;
								user.fullName = name;
								user.fbVerified = { id, link };
								user.loginType = 'facebook';

								this.props.loginSocial(user, () => {
									if (AuthStorage.loggedIn) {
										this.props.navigation.navigate('Home');
									}
								});
							}
						}

						const infoRequest = new GraphRequest(
							'/me',
							{
								accessToken,
								parameters: {
									fields: {
										string: 'email,name,gender,photos,cover,picture,link'
									}
								}
							},
							responseInfoCallback
						);

						// Start the graph request.
						new GraphRequestManager().addRequest(infoRequest).start()
					}
				);
			}
		}, (error) => {
			this.props.toggleMessageBox({
				message: `Login failed with error: ${error}`,
				type: 'error'
			});
		});
	}

	render() {
		return (
			<Button
				iconLeft
				block
				style={{ marginBottom: 15 }}
				onPress={this.handleLoginFb}
			>
				<Icon name="logo-facebook" style={{ fontSize: 24, color: '#fff', marginRight: 10 }} />
				<Text>Facebook</Text>
			</Button>
		);
	}
}

function mapStateToProps(state) {
	return {
		// auth: state.auth
	};
}

const mapDispatchToProps = {
	loginSocial,
	toggleMessageBox
};

export default connect(mapStateToProps, mapDispatchToProps)(FbBtnLogin);
