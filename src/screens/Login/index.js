import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
	Container,
	Content,
	Button,
	View,
	Text,
} from 'native-base';

import Header from '../../components/Header';
import Input from '../../components/Input';
import ButtonLoader from '../../components/ButtonLoader';
// import FbBtnLogin from '../../components/FbBtnLogin';
// import GgBtnLogin from '../../components/GgBtnLogin';

import styles from './styles';

import AuthStorage from '../../utils/AuthStorage';

import { loginRequest } from '../../actions/auth';

const validate = values => {
	const errors = {};
	const { email, password } = values;

	if (!email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = 'Invalid email address';
	}

	if (!password) {
		errors.password = 'Required';
	} else if (password.length < 5) {
		errors.password = 'Too short';
	}

	return errors;
};

class Login extends Component {
	static propTypes = {
		...propTypes,
		navigation: PropTypes.object
	}

	state = {
		loading: false,
		hasError: false
	}

	componentWillMount() {
		if (AuthStorage.loggedIn) {
			this.props.navigation.navigate('Home');
		}
	}

	componentWillReceiveProps(nextProps) {
		const { auth } = nextProps;
		if (auth.error && this.state.loading) {
			this.setState({
				loading: false,
				hasError: true
			});
		}
	}

	handlePressSubmit = (data) => {
		this.setState({
			loading: true,
			hasError: false
		});
		this.props.loginRequest(data, () => {
			if (AuthStorage.token) {
				this.props.navigation.navigate('Home');
			}
		});
	}

	render() {
		const { handleSubmit, pristine, submitting, navigation } = this.props;

		return (
			<Container style={styles.container}>
				{
					this.state.loading && <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, width: '100%', backgroundColor: 'transparent', zIndex: 9999 }} />
				}
				<Header
					name="Đăng nhập"
					navigation={navigation}
				/>
				<Content style={styles.content}>
					<View>
						<Text style={{ marginBottom: 15, fontStyle: 'italic' }}>
							Với việc đăng nhập, bạn có thể lưu và chia sẻ nhiều địa chỉ hữu ích với bạn bè.
							Hay thậm chí là bạn có thể đăng thông tin về dãy trọ của bạn.
						</Text>
						<Field
							name="email"
							label="Email"
							autoCapitalize="none"
							icon="ios-mail-outline"
							keyboardType="email-address"
							component={Input}
						/>
						<Field
							name="password"
							label="Mật khẩu"
							secureTextEntry
							icon="ios-unlock-outline"
							returnKeyType="done"
							onSubmitEditing={handleSubmit(this.handlePressSubmit)}
							component={Input}
						/>
						{
							this.state.hasError && <Text style={{ fontSize: 10, color: '#d9534f', marginTop: 5, fontStyle: 'italic' }}>Tài khoản hoặc mật khẩu không đúng!</Text>
						}
						<ButtonLoader
							block
							info
							style={styles.btn}
							onPress={handleSubmit(this.handlePressSubmit)}
							loading={this.state.loading || submitting}
							text="Đăng nhập"
						/>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Button
								style={{ marginLeft: -16 }}
								transparent
								onPress={() => navigation.navigate('ForgotPass')}
							>
								<Text>Quên mật khẩu?</Text>
							</Button>
							<Button
								style={{ marginRight: -16 }}
								transparent
								onPress={() => navigation.navigate('SignUp')}
							>
								<Text>Đăng ký</Text>
							</Button>
						</View>

					</View>
					<View style={{ marginBottom: 50 }}>
						<Text style={{ marginBottom: 15, marginTop: 30, fontStyle: 'italic' }}>
							Hoặc đăng nhập bằng:
						</Text>
						{/* <FbBtnLogin navigation={navigation} />
						<GgBtnLogin navigation={navigation} /> */}
					</View>

				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

const mapDispatchToProps = {
	loginRequest
};

export default reduxForm(
	{
		form: 'login',
		validate,
		initialValues: {
			email: 'admin@gmail.com',
			password: '123456'
		}
	}
)(connect(mapStateToProps, mapDispatchToProps)(Login));
