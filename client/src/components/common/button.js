/**
 * @format
 */
import React from 'react';
import {
	StyleSheet, Text, TouchableOpacity 
} from 'react-native';

import Colors from '../../utils/colors';

const SumoButton = props => {
	const { 
	  containerStyle, 
	  onPress, 
	  textStyle,
	  label
	} = props;

	return (
		<TouchableOpacity
			style={[ styles.container, containerStyle ]}
			onPress={onPress}>
			<Text style={[styles.text, textStyle  ]}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: Colors.primary,
		borderColor: Colors.lightgray,
		borderRadius: 4,
		borderWidth: StyleSheet.hairlineWidth,
		justifyContent: 'center',
		marginBottom: 12,
		paddingVertical: 12,
	},
	text: {
		color: Colors.white,
		height: 20,
		textAlign: 'center',
	},
});

export default SumoButton;
