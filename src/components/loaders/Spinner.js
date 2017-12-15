/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-07-20 17:17:37
 *
 * LastModified: 2017-07-20 17:17:37
 *-------------------------------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Container, Spinner } from 'native-base';

class AppSpinner extends Component {
	static propTypes = {
		loading: PropTypes.bool,
	};

	static defaultProps = {
		loading: true,
	};

	render() {
		return this.props.loading ? (
			<Container style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', position: 'absolute', zIndex: 999999, height: '100%', width: '100%', top: 0, bottom: 0, right: 0, left: 0, flex: 1 }}>
				<Spinner color="#fbca08" />
			</Container>
		) : null;
	}
}

function mapStateToProps(state) {
	return {
		loading: state.loader.sending
	};
}

export default connect(mapStateToProps, {})(AppSpinner);
