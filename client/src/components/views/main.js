/**
 * @format
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorContext } from '../../contexts';
import { 
	MainScreen,
	TaskScreen,
} from './screens';
import { 
	Colors,
	Translations
} from '../../utils';

const MainScreenWrapper = ({ navigation, route }) => {
	return (
		<NavigatorContext.Consumer>
			{(context) => {
				return (
					<MainScreen
						error={context.error} 
						loading={context.loading} 
						navigation={navigation}
						onDelete={context.onDelete}
						route={route}
						tasks={context.tasks}
					 />
			)}}
		</NavigatorContext.Consumer>
	);
}

const TaskScreenWrapper = ({ navigation, route }) => {
	return (
		<NavigatorContext.Consumer>
			{(context) => {
				return (
					<TaskScreen
						editing={route.params.editing}
						error={context.error}
						loading={context.loading}
						navigation={navigation}
						onSave={context.onSave}
						route={route}
						task={route.params.task}
						tasks={context.tasks}
					/>
				)
			}}
		</NavigatorContext.Consumer>
	);
}

const MainView = () => {
	const Stack = createStackNavigator();

	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					component={MainScreenWrapper}
					options={{
						headerStyle: {
							backgroundColor: Colors.primary,
						},
						headerTitleAlign: 'center',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						headerTintColor: Colors.white,
						title: Translations['main.title'],
					}}
					name='Main' />
				<Stack.Screen 
					name='task' 
					component={TaskScreenWrapper}
					options={{
						headerStyle: {
							backgroundColor: Colors.primary,
						},
						headerTitleAlign: 'center',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						headerTintColor: Colors.white,
						title: Translations['task.title']
					}} />
			</Stack.Navigator>
		</>
	);
};

export default MainView;
