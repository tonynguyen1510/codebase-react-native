import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Container,
	Content,
	Text
} from 'native-base';

import Header from '../../components/Header';

class Profile extends Component {

	static propTypes = {
		navigation: PropTypes.object
	};

	render() {

		return (
			<Container>
				<Header
					name="Thông tin tài khoản"
					navigation={this.props.navigation}
				/>

				<Content padder>
					<Text>
						profile
         			</Text>
				</Content>
			</Container>
		);
	}
}

export default Profile;
