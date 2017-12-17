import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import {
	Container,
	Content,
	Button,
	View,
	Text,
} from 'native-base';

import Header from 'src/components/Header';
import Input from 'src/components/Form/Input/ReduxForm';
import ButtonLoader from 'src/components/ButtonLoader';
import CheckBox from 'src/components/Form/CheckBox/ReduxForm';

import { required, minLength, email, aol } from 'src/utils/validate';

import styles from './styles';

const minLength6 = minLength(6);

function mapStateToProps(/* state */) {
	return {
		// requestStatus: state.requestStatus
	};
}

const mapDispatchToProps = {
	// setUser
};

@reduxForm({
	form: 'signUp',
	initialValues: {
		sendPR: true,
	}
})
@connect(mapStateToProps, mapDispatchToProps)
export default class SignUp extends Component {
	static propTypes = {
		...propTypes,
		setUser: PropTypes.func,
		navigation: PropTypes.object,
	}

	state = {
		loading: false,
	}

	handlePressSubmit = (data) => {
		console.log('data', data);
	}

	render() {
		const { handleSubmit, submitting, navigation } = this.props;

		return (
			<Container style={styles.container}>
				<Header
					hasBack
					name="Đăng ký"
					navigation={navigation}
				/>
				<Content style={{ padding: 20 }}>
					<View>
						<Field
							name="fullName"
							label="Họ và Tên"
							icon="ios-person-outline"
							component={Input}
							validate={[required, minLength6]}
						/>
						<Field
							name="email"
							label="Email"
							autoCapitalize="none"
							keyboardType="email-address"
							icon="ios-mail-outline"
							component={Input}
							validate={[required, email, aol]}
						/>
						<Field
							name="password"
							label="Mật khẩu"
							secureTextEntry
							icon="ios-unlock-outline"
							component={Input}
							validate={[required, minLength6]}
						/>
						<Text style={{ marginTop: 15 }}>
							Đăng ký đồng nghĩa với việc bạn chấp nhận
							{' '}
							<Text
								style={{ color: '#3F51B5' }}
								onPress={() => Linking.openURL('https://rencity.vn')}
							>
								Điều khoản và Điều kiện của RenCity.
							</Text>
						</Text>

						<ButtonLoader
							block
							info
							style={styles.btn}
							onPress={handleSubmit(this.handlePressSubmit)}
							loading={this.state.loading || submitting}
							text="Đăng nhập"
						/>

						<Field
							name="sendPR"
							label="Gửi cho tôi email thông báo về các tin tức mới của RenCity."
							component={CheckBox}
						/>

						<View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
							<Text>Bạn đã có tài khoản?</Text>
							<Button
								style={{ marginRight: -16 }}
								transparent
								onPress={() => navigation.goBack()}
							>
								<Text>Đăng nhập</Text>
							</Button>
						</View>
					</View>

				</Content>
			</Container>
		);
	}
}
