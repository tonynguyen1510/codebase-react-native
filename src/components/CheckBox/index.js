import React from 'react';
import PropTypes from 'prop-types';

import {
	View,
	Text,
	CheckBox,
	Body
} from 'native-base';

const CheckBoxComponent = ({
	label,
	input,
	meta: { touched, error, warning }
}) => {
	return (
		<View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }} >
			<CheckBox
				checked={!!input.value}
				onPress={() => input.onChange(!input.value)}
				style={{ marginLeft: -10, marginRight: 10 }}
			/>
			<Body>
				<Text style={{ marginLeft: 10 }}>
					{label}
				</Text>
			</Body>
		</View>
	);
};

// CheckBoxComponent.propTypes = {
// 	label: PropTypes.string,
// 	input: PropTypes.object,
// 	meta: PropTypes.object,
// };

export default CheckBoxComponent;
