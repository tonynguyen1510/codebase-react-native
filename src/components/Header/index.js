import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Header,
	Title,
	Button,
	Icon,
	Left,
	Body,
	Right,
} from 'native-base';

import color from 'src/constants/color';

class AppHeader extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		hasBack: PropTypes.bool,
		navigation: PropTypes.object,
	};

	render() {
		const { name, navigation, hasBack } = this.props;
		return (
			<Header
				style={{ backgroundColor: color.primary }}
				androidStatusBarColor={color.primary}
				iosBarStyle="light-content"
			>
				<Left>
					{
						!hasBack ?
							<Button
								transparent
								onPress={() => navigation.navigate('DrawerOpen')}
							>
								<Icon active name="menu" style={{ color: color.inversePrimary }} />
							</Button> :
							<Button transparent onPress={() => navigation.goBack()}>
								<Icon name="arrow-back" style={{ color: color.inversePrimary }} />
							</Button>
					}
				</Left>

				<Body style={{ justifyContent: 'center', flex: 1 }}>
					<Title style={{ color: '#FFF' }}>{name}</Title>
				</Body>

				<Right>
					<Button
						transparent
						onPress={() => navigation.navigate('Search')}
					>
						<Icon active name="search" style={{ color: color.inversePrimary }} />
					</Button>
				</Right>
			</Header>
		);
	}
}
export default AppHeader;
