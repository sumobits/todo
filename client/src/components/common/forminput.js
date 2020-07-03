/**
 * @format
 */
import React, { useState } from 'react';
import { 
	StyleSheet, 
	Text,
	TextInput,
	TouchableOpacity,
	View,
 } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
	Colors,
	Fonts, 
}from '../../utils';

const renderTextInput = props => {
	const {
		disabled = false,
		label,
		multi = false,
		numOfLines = 1,
		onChange,
		value
	} = props;
	
	return (
		<View style={styles.container}>
			<Text style={styles.label} disabled>{label}</Text>
			<TextInput
				selectionColor={Colors.darkblue}
				style={multi ? styles.textArea : styles.input}
				multiline={multi}
				numberOfLines={numOfLines}
				onChangeText={onChange}
				disabled={disabled}
				value={value}
			/>
		</View>
	);
};

const renderDateInput = props => {
	const {
		disabled = false,
		label,
		minimumDate,
		maximumDate,
		onChange,
		value,
	} = props;
	const [ showPicker, setShowPicker ] = useState(false);
	
	return (
		<View style={styles.container}>
			<Text style={styles.label} disabled={true}>{label}</Text>
			<View style={styles.dateContainer}>
				<TextInput
					selectionColor={Colors.darkblue}
					style={styles.dateInput}
					onChangeText={onChange}
					disabled={disabled}
					value={value ? moment(value).format('MMMM Do YYYY') : undefined}
				/>
				{
					showPicker &&
					<DateTimePicker
						display="default"
						is24Hour={false}
						maximumDate={maximumDate || new Date()}
						minimumDate={minimumDate || new Date()}
						mode={'date'}
						onChange={(e, date) => task.targetCompletion = date}
						value={value || undefined}
					/>
				}
				<TouchableOpacity onPress={() => setShowPicker(true)}>
					<Icon color={Colors.primary} name='calendar' size={24} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const FormInput = props => {
	const { 
		type = 'text'
  	} = props;
	const input = (type === 'date' ? renderDateInput(props) : renderTextInput(props));

	return (
		input
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 6,
	},
	dateContainer: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		padding: 6,
	},
	input: {
		backgroundColor: Colors.white,
		borderColor: Colors.darkgrey,
		borderWidth: StyleSheet.hairlineWidth,
		height: 40,
		margin: 20,
	},
	dateInput: {
		backgroundColor: Colors.white,
		borderColor: Colors.darkgrey,
		borderWidth: StyleSheet.hairlineWidth,
		height: 40,
		margin: 20,
		width: '80%',
	},
	label: {
		left: 20,
		...Fonts.formLabel,
	},
	textArea: {
		backgroundColor: Colors.white,
		borderColor: Colors.darkgrey,
		borderWidth: StyleSheet.hairlineWidth,
		height: '55%',
		justifyContent: 'flex-start',
		margin: 20,
		textAlignVertical: "top",
	},
});

export default FormInput;
