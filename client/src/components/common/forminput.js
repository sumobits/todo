/**
 * @format
 */
import React from 'react';
import { 
	StyleSheet, 
	Text,
	TextInput,
	View,
 } from 'react-native';
import {
	Colors,
	Fonts, 
}from '../../utils';

const FormInput = props => {
  const { 
	  style, 
	  label,
	  multi,
	  numOfLines,
	  onChangeText,
	  disabled,
	} = props;

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				selectionColor={Colors.darkblue}
				style={[styles.input, style]}
				multiline={multi}
				numberOfLines={numOfLines}
				onChangeText={onChangeText}
				disabled
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: Colors.white,
		borderColor: Colors.darkgrey,
		borderWidth: StyleSheet.hairlineWidth,
		height: 40,
		margin: 20,
	},
	label: {
		left: 18,
		...Fonts.formLabel,
	}
});

export default FormInput;
