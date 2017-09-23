import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableHighlight, View } from 'react-native';
import {
	Text,
	Container,
	List,
	ListItem,
	Content,
	Left,
	Right,
	Badge,
	Icon,
	Thumbnail
} from 'native-base';

import { logoutRequest } from '../../actions/auth';

import AuthStorage from '../../utils/AuthStorage';
import color from '../../constants/color';

import styles from './style';

const drawerCover = require('../../../images/drawer-cover.jpg');

const drawerImage = require('../../../images/rencity-logo.png');

const authenticatedRoutes = [
	{
		name: 'Home',
		route: 'Home',
		icon: 'ios-home-outline'
	},
	{
		name: 'Danh sách nhà bạn đã lưu',
		route: 'BlankPage2',
		icon: 'ios-bookmark-outline'
	},
	{
		name: 'Trở thành chủ nhà',
		route: 'BlankPage2',
		icon: 'ios-ribbon-outline'
	},
	{
		name: 'Danh sách nhà của bạn',
		route: 'BlankPage2',
		icon: 'ios-clipboard-outline' ,
	},
	{
		name: 'Tài khoản',
		route: 'Profile',
		icon: 'ios-person-outline'
	},
	{
		name: 'Đăng xuất',
		route: 'logout',
		icon: 'ios-log-out'
	},
];

const unauthenticatedRoutes = [
	{
		name: 'Home',
		route: 'Home',
		icon: 'ios-home-outline'
	},
	{
		name: 'Đăng nhập',
		route: 'Login',
		icon: 'ios-log-in-outline'
	}
];

class DrawBar extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		logoutRequest: PropTypes.func.isRequired,
	}

	handleClickDrawBar = (data) => {
		if (data.route === 'logout') {
			this.props.navigation.navigate('DrawerClose');
			this.props.logoutRequest(() => {
				this.props.navigation.navigate('Login');
			});
		} else {
			this.props.navigation.navigate(data.route);
		}
	}

	handleGoToProfile = () => {
		this.props.navigation.navigate('Profile');
	}

	render() {
		const { auth } = this.props;

		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
					<Image source={drawerCover} style={styles.drawerCover}>
						{
							AuthStorage.loggedIn ?
								<TouchableHighlight onPress={this.handleGoToProfile} style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
									<View>
										<Thumbnail large source={{ uri: auth.avatar }} style={{ borderColor: color.primary, borderWidth: 3, alignSelf: 'center' }} />
										<Text style={{ backgroundColor: 'transparent', color: color.primary, fontSize: 26, fontWeight: 'bold' }}>{auth.fullName}</Text>
									</View>
								</TouchableHighlight> :
								<Image square style={styles.drawerImage} source={drawerImage} />
						}
					</Image>
					<List
						dataArray={AuthStorage.loggedIn ? authenticatedRoutes : unauthenticatedRoutes}
						renderRow={
							data => (
								<ListItem button noBorder onPress={() => { this.handleClickDrawBar(data); }}>
									<Left>
										<Icon active name={data.icon} style={{ color: '#777', fontSize: 26, width: 30 }} />
										<Text style={styles.text}>
											{data.name}
										</Text>
									</Left>
								</ListItem>
							)
						}
					/>
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
	logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawBar);
