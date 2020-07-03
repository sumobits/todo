/**
 * @format
 */
import React, { Fragment, useState } from 'react';
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {
	SumoButton,
	SumoFormInput,
} from '../../common';
import {
	Colors,
	Fonts,
	Translations,
} from '../../../utils';

const TaskScreen = props => {
	const { 
		editing,
		error, 
		navigation,
		tasks,
		task 
	} = props;
	const [ disabled, setDisabled ] = useState(!editing);
	
	const onEdit = () => {
		setDisabled(false);
	};

	const onCancel = () => {
		navigation.navigate('main', { tasks });
	};

	const onSave = () => {
		task.id = task.id ? task.id : Math.random();
		tasks.push(task)
		navigation.navigate('main', { tasks });
	};

	return (
		<>
			<ScrollView style={styles.container}>
				<SumoFormInput
					label={Translations['task.name.label']}
					value={task.name}
					onChange={val => {
						task.name = val
					}}
					disabled={disabled}
				/>
				<SumoFormInput
					label={Translations['task.due.label']}
					value={task.targetComletion || moment().add(1, 'days')}
					onChange={val => {
						task.name = val
					}}
					disabled={disabled}
					type='date'
				/>
				<SumoFormInput
					label={Translations['task.description.label']}
					multi={true}
					numOfLines={10}
					onChange={val => {
						task.description = val
					}}
					value={task.description}
					disbaled={disabled}
				/>
				<TouchableOpacity style={styles.lifecycleContainer}>
					<SumoButton
						onPress={() => {
							if (task.inProgress) {
								task.inProgress = false;
								task.actualCompletion = new Date();
							} else {
								task.inProgress = true;
								task.started = new Date();
							}
						}}
						styles={task.inProgress ? styles.completeButton : styles.startButton}
						title={task.inProgress ? Translations['task.complete.action'] : Translations[ 'task.start.action']} 
					/>
				</TouchableOpacity>
			</ScrollView>
			{
				!editing && (
					<Fragment>
						<TouchableOpacity onPress={onEdit} style={styles.rightFABContainer}>
							<Icon color={Colors.white} name="pencil" size={36} style={styles.fabIcon} />
						</TouchableOpacity>
					</Fragment>
				)
			}
			{
				editing && (
					<Fragment>
						<TouchableOpacity onPress={onCancel} style={styles.leftFABContainer}>
							<Icon color={Colors.white} name="close" size={36} style={styles.fabIcon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={onSave} style={styles.rightFABContainer}>
							<Icon color={Colors.white} name="check" size={36} style={styles.fabIcon} />
						</TouchableOpacity>
					</Fragment>	
				)
			}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	rightFABContainer: {
		alignItems: 'center',
		backgroundColor: Colors.primary,
		borderRadius: 50,
		height: 70,
		justifyContent: 'center',
		position: 'absolute',
		width: 70,
		right: 10,
		top: (Dimensions.get('window').height - 155),
		flex: 1,
	},
	leftFABContainer: {
		alignItems: 'center',
		backgroundColor: Colors.red,
		borderRadius: 50,
		color: Colors.secondary,
		height: 70,
		justifyContent: 'center',
		left: 10,
		position: 'absolute',
		width: 70,
		top: (Dimensions.get('window').height - 155),
		flex: 1,
	},
	fabIcon: {
		color: Colors.white,
	},
	lifecycleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	startButton: {
		backgroundColor: Colors.green,
		color: Colors.darkgray,
		width: 100,
		...Fonts.body,
	},
	completeButton: {
		backgroundColor: Colors.red,
		color: Colors.darkgray,
		width: 100,
		...Fonts.body,
	},
	completionLabel: {
		...Fonts.formLabel,
	},
	datePickerContainer: {
		left: 18,
		paddingBottom: 25,
	},
	datePicker: {
		borderColor: Colors.darkgray,
		borderStyle: 'solid',
		borderWidth: StyleSheet.hairlineWidth,
	},
	lineItem: {
		borderColor: Colors.darkgray,
		borderStyle: 'solid',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	},
});

export default TaskScreen;
