/**
 * @format
 */
import React, { useState } from 'react';
import {
	Button,
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { FormInput } from './common';
import {
	Colors,
	Fonts,
} from '../utils';

const Stack = createStackNavigator();
let mainNav; //not the best but for time.

const renderTask = props => {
	const { item } = props;

	const onPress = () => {
		mainNav.navigate('Task', { allTasks, item, editing: false });
	};

	return (
		<TouchableWithoutFeedback  onPress={onPress}>
			<View style={styles.lineItem}>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const MainComponent = props => {
	let allTasks = [];
	const { navigation } = props;

	mainNav = navigation;// TODO fix me

	if(props.route.params) {
		allTasks = props.route.params.allTasks;
	}

	const onCreateTask = () => {
		navigation.navigate('Task', {allTasks, task: {}, editing: true});
	};

	return (
		<>
			<View>
				<FlatList
					contentContainerStyle={allTasks.length > 0 ? styles.lineItem : null}
					data={allTasks}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem={renderTask}
					style={styles.list} />
			</View>
			<View>
				<TouchableOpacity onPress={onCreateTask} style={styles.taskCreateContainer}>
					<Text style={styles.actionButtonText}>+</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const TaskComponent = props => {
	const { navigation } = props;
	const { allTasks = [], task, editing } = props.route.params;
	const disabled = editing;

	const onTaskCancel = () => {
		navigation.navigate('Main', {allTasks});
	};

	const onTaskSave = () => {
		task.id = Math.random();
		allTasks.push(task)
		navigation.navigate('Main', {allTasks});
	};

	return (
		<>
			<ScrollView style={styles.taskContainer}> 
				<FormInput
					label='Name'
					value={task.name}
					onChangeText={val => {
						task.name = val
					}}
					disabled
				/>
				<View style={styles.datePickerContainer}>
					<Text style={styles.completionLabel}>Due Date</Text>
					<DatePicker
						date={new Date()}
						minimumDate={new Date()}
						mode='date'
						onDateChange={date => task.targetCompletion = date}
						style={styles.datePicker}
						value={task.targetCompletion}
					/>
				</View>
				<FormInput
					label='Description'
					multi={true}
					numberOfLines={4}
					onChangeText={val => {
						task.description = val
					}}
					value={task.description}
					disbaled
				/>
				<TouchableOpacity style={styles.lifecycleContainer}>
					<Button
						onPress={() => {
							if(task.inProgress) {
								task.inProgress = false;
								task.actualCompletion = new Date();
							} else {
								task.inProgress = true;
								task.started = new Date(); 
							}
							
							
						}}
						styles={task.inProgress ? styles.completeButton : styles.startButton}
						title={task.inProgress ? 'Complete' : 'Start'} />
				</TouchableOpacity>
			</ScrollView> 

			<TouchableOpacity onPress={onTaskCancel} style={styles.taskCancelContainer}>
				<Text style={styles.cancelButton}>Cancel</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onTaskSave} style={styles.taskSaveContainer}>
				<Text style={styles.saveButton}>Save</Text>
			</TouchableOpacity>
		</>
	);
};

const MainView = props => {
	return (
		<Stack.Navigator>
			<Stack.Screen 
				name="Main"
				component={MainComponent} 
				options={{
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTintColor: Colors.secondary,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					title: 'TO DO'
				}} {...props}/>
			<Stack.Screen name="Task" component={TaskComponent} />
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	body: { 
		backgroundColor: Colors.white,
		...Fonts.body,
	},
	actionButtonText: {
		...Fonts.actionButton,
	},
	taskCreateContainer: {
		alignItems: 'center',
		backgroundColor: Colors.primary,
		borderRadius: 50,
		color: Colors.secondary,
		height: 70,
		justifyContent: 'center',
		position: 'absolute',
		width: 70,
		right: 8,
		top: (Dimensions.get('window').height - 155),
		flex: 1,
	},
	taskSaveContainer: {
		alignItems: 'center',
		backgroundColor: Colors.primary,
		borderRadius: 50,
		color: Colors.secondary,
		height: 70,
		justifyContent: 'center',
		position: 'absolute',
		width: 70,
		right: 8,
		top: (Dimensions.get('window').height - 155),
		flex: 1,
	},
	taskCancelContainer: {
		alignItems: 'center',
		backgroundColor: Colors.red,
		borderRadius: 50,
		color: Colors.secondary,
		height: 70,
		justifyContent: 'center',
		left: 8,
		position: 'absolute',
		width: 70,
		top: (Dimensions.get('window').height - 155),
		flex: 1,
	},
	cancelButton: {
		...Fonts.body,
	},
	saveButton: {
		...Fonts.body,
	},
	textArea: {
		height: 150,
		justifyContent: 'flex-start',
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
	datePickerContainer: {
		left: 18,
		paddingBottom: 25,
	},
	completionLabel: {
		...Fonts.formLabel,
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
	datePicker: {
		borderColor: Colors.darkgray,
		borderStyle: 'solid',
		borderWidth: StyleSheet.hairlineWidth,
	}
});

export default MainView;
