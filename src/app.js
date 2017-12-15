/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 23:35:32
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
// import CodePush from 'react-native-code-push';

import { Container, Content, Text, View, Root, Toast } from 'native-base';
import Modal from 'react-native-modalbox';
import MainStackRouter from './routers/MainStackRouter';
import ProgressBar from './components/Loaders/ProgressBar';

// import theme from './themes/base-theme';

import Spinner from './components/Loaders/Spinner';
import MessageBox from './components/MessageBox';

import { toggleMessageBox } from './actions/messageBox';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
		height: null
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal1: {
		height: 300
	}
});

class App extends Component {
	static propTypes = {
		loader: PropTypes.object.isRequired,
		toggleMessageBox: PropTypes.func.isRequired,
	}

	state = {
		showDownloadingModal: false,
		showInstalling: false,
		downloadProgress: 0
	}

	componentDidMount() {
		// CodePush.sync(
		// 	{ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
		// 	(status) => {
		// 		switch (status) {
		// 			case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
		// 				this.setState({ showDownloadingModal: true });
		// 				this._modal.open();
		// 				break;
		// 			case CodePush.SyncStatus.INSTALLING_UPDATE:
		// 				this.setState({ showInstalling: true });
		// 				break;
		// 			case CodePush.SyncStatus.UPDATE_INSTALLED:
		// 				this._modal.close();
		// 				this.setState({ showDownloadingModal: false });
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	},
		// 	({ receivedBytes, totalBytes }) => {
		// 		this.setState({ downloadProgress: receivedBytes / totalBytes * 100 });
		// 	}
		// );
	}

	componentWillReceiveProps(nextProps) {
		const { loader } = nextProps;
		if (loader.error) {
			nextProps.toggleMessageBox({ message: loader.error, type: 'error' });
		}
	}

	render() {
		// if (this.state.showDownloadingModal) {
		// 	return (
		// 		<Container
		// 			theme={theme}
		// 			style={{ backgroundColor: theme.defaultBackgroundColor }}
		// 		>
		// 			<Content style={styles.container}>
		// 				<Modal
		// 					style={[styles.modal, styles.modal1]}
		// 					backdrop={false}
		// 					ref={c => {
		// 						this._modal = c;
		// 					}}
		// 					swipeToClose={false}
		// 				>
		// 					<View
		// 						style={{
		// 							flex: 1,
		// 							alignSelf: 'stretch',
		// 							justifyContent: 'center',
		// 							padding: 20
		// 						}}
		// 					>
		// 						{
		// 							this.state.showInstalling
		// 							? <Text
		// 								style={{
		// 									color: theme.brandPrimary,
		// 									textAlign: 'center',
		// 									marginBottom: 15,
		// 									fontSize: 15
		// 								}}
		// 							>
		// 								Installing update...
		// 							</Text>
		// 							: <View
		// 								style={{
		// 									flex: 1,
		// 									alignSelf: 'stretch',
		// 									justifyContent: 'center',
		// 									padding: 20
		// 								}}
		// 							>
		// 								<Text
		// 									style={{
		// 										color: theme.brandPrimary,
		// 										textAlign: 'center',
		// 										marginBottom: 15,
		// 										fontSize: 15
		// 									}}
		// 								>
		// 									Downloading update...
		// 									{' '}
		// 									{`${parseInt(this.state.downloadProgress, 10)} %`}
		// 								</Text>
		// 								<ProgressBar
		// 									color="theme.brandPrimary"
		// 									progress={parseInt(this.state.downloadProgress, 10)}
		// 								/>
		// 							</View>
		// 						}
		// 					</View>
		// 				</Modal>
		// 			</Content>
		// 		</Container>
		// 	);
		// }

		return (
			<Root>
				<Spinner />
				<MainStackRouter />
				<MessageBox />
			</Root>
		);
	}
}

function mapStateToProps(state) {
	return {
		loader: state.loader
	};
}

const mapDispatchToProps = {
	toggleMessageBox
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
