/**
 * @format
 */
import React, { useState } from 'react';
import {
	Button,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
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

const renderTask = task => {
	return (
		<View style={lineItem}>
			<Text style={lineItemName}>{task.name}</Text>
			<Text style={lineItemDescription}>{task.name}</Text>
		</View>
	);
};

const MainComponent = props => {
	const { navigation } = props;
	const [ tasks, setTasks ] = useState();

	const onCreateTask = () => {
		navigation.navigate('Task', {task: {}, editing: true});
	};

	const onLineItemPress = task => {
		navigation.navigate('Task', {task});
	};

	return (
		<>
			<View>
				<FlatList
					data={tasks}
					keyExtractor={task => task.id}
					onPress={onLineItemPress}
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
	const { navigator } = props;
	const { task, editing } = props.route.params;
	const disabled = editing;

	const onTaskCancel = () => {
		navigator.navigate('Main')
	};

	const onTaskSave = () => {
		//todo save task to server
	};

	const changeStatus = () => {
		task.inProgress=true;
		task.started = new Date(); 
	};

	return (
		<>
			<View style={styles.taskContainer}> 
				<FormInput
					label='Name'
					value={task.name}
					disabled
				/>
				<View style={styles.datePickerContainer}>
					<Text style={styles.completionLabel}>Due Date</Text>
					<DatePicker
						date={new Date()}
						maximumDate={moment().add(5, 'years').fromNow()}
						minimumDate={new Date()}
						mode='date'
						onDateChange={date => task.targetCompletion = date}
						value={task.targetCompletion}
					/>
				</View>
				<FormInput
					label='Description'
					multi={true}
					numberOfLines={4}
					value={task.description}
					disbaled
				/>
				<TouchableOpacity style={styles.lifecycleContainer}>
					<Button
						onPress={changeStatus}
						styles={task.inProgress ? styles.completeButton : styles.startButton}
						title={task.inProgress ? 'Complete' : 'Start'} />
				</TouchableOpacity>
			</View> 

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
	}
});

export default MainView;
