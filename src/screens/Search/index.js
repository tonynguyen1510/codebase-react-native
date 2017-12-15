/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-12 14:17:52
 *
 * LastModified: 2017-07-12 14:17:52
 *-------------------------------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Item, Input, Icon, Button, Text, Content, List, ListItem, Separator, Left, Body, Right } from 'native-base';

import color from '../../constants/color';

const datasRecent = [
	{
		route: 'NHBasicList',
		text: 'Quận 1',
	},
	{
		route: 'NHListDivider',
		text: 'Quận 2',
	},
	{
		route: 'NHListHeader',
		text: 'Quận 3',
	}
];

const datasCommon = [
	{
		route: 'NHBasicList',
		text: 'Quận Tân Bình',
	},
	{
		route: 'NHListDivider',
		text: 'Quận 2',
	},
	{
		route: 'NHListHeader',
		text: 'Quận Bình Thạch',
	}
];

export default class SearchPage extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	render() {
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header

					style={{ backgroundColor: color.primary }}
					androidStatusBarColor={color.primary}
					iosBarStyle="light-content"
				>
					<Button style={{ marginLeft: -8 }} transparent onPress={() => this.props.navigation.goBack()}>
						<Icon name="arrow-back" style={{ color: color.inversePrimary }} />
					</Button>
					<Body>
						<Item style={{ backgroundColor: color.default, height: 34, paddingLeft: 8, paddingRight: 10 }}>
							<Icon name="ios-search" style={{ color: color.inverseDefault, fontSize: 18 }} />
							<Input placeholder="Địa chỉ..." autoFocus />
							{/* <Icon name="ios-people" style={{ color: '#575757' }} /> */}
						</Item>
					</Body>
					<Button transparent style={{ marginRight: -5, marginLeft: 5 }}>
						<Icon name="md-more" style={{ color: color.inversePrimary }} />
					</Button>
				</Header>

				<Content>
					<List>
						<ListItem
							icon
							last
							button
							style={{ marginRight: 15 }}
							onPress={() => { console.log('ss'); }}
						>
							<Left>
								<Icon name="ios-locate-outline" />
							</Left>
							<Body>
								<Text>Ví trí hiện tại</Text>
							</Body>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
						<Separator bordered>
							<Text>Các tìm kiếm gần đây</Text>
						</Separator>
						{
							datasRecent.map(
								(el, i) => (
									<ListItem
										key={`recent${i}`}
										last={i === datasRecent.length - 1}
										style={{ marginRight: 15 }}
										button
										onPress={() => { console.log('ss'); }}
									>

										<Left>
											<Icon name="ios-pin-outline" />
											<Text>{el.text}</Text>
										</Left>
										<Right>
											<Icon name="arrow-forward" />
										</Right>
									</ListItem>
								)
							)
						}

						<Separator bordered>
							<Text>Các địa điểm thông dụng</Text>
						</Separator>
						{
							datasCommon.map(
								(el, i) => (
									<ListItem
										key={`common${i}`}
										style={{ marginRight: 15 }}
										button
										onPress={() => { console.log('ss'); }}
									>

										<Left>
											<Icon name="ios-pin-outline" />
											<Text>{el.text}</Text>
										</Left>
										<Right>
											<Icon name="arrow-forward" />
										</Right>
									</ListItem>
								)
							)
						}
					</List>
				</Content>
			</Container>
		);
	}
}
