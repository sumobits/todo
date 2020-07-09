/**
 * @format
 */
import React, { useState } from 'react';
import {
	Alert,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	SumoLoadingIndicator
} from '../../common';
import {
	Colors,
	Fonts,
	Translations,
} from '../../../utils';


const MainScreen = props => {
	const {
		error,
		loading,
		navigation,
		onDelete,
		tasks
	} = props;
	const [ showDelete, setShowDelete ] = useState(false);
	const onCreateTask = () => {
		navigation.navigate('task', { task: {}, editing: true });
	};
	const renderTask = props => {
		const { item } = props;
		const onPress = () => {
			navigation.navigate('task', { task: item, editing: false });
		};
		const onLongPress = () => {
			setShowDelete(true);
		};
		const promptDelete = () => {
			return (
				Alert.alert('Decide', 'Are you sure?',
					[
						{ text: 'Cancel', onPress: () => { } },
						{ text: 'OK', onPress: () => { onDelete(item.id) } },
					]
				)
			);
		}

		return (
			<View style={styles.lineItemContainer}>
				{
					showDelete &&
						<TouchableOpacity onPress={promptDelete} style={styles.deleteButtonContainer}>
							<Icon color={Colors.red} name='delete-forever-outline' size={18} />
						</TouchableOpacity>
				}
				<TouchableNativeFeedback onLongPress={onLongPress} onPress={onPress}>
					<View style={styles.lineItem}>
						<Text>{item.name}</Text>
						<Text>{item.description}</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	};

	if (loading) {
		return (
			<SumoLoadingIndicator />
		);
	}

	return (
		<>
			<View>
				<FlatList
					contentContainerStyle={styles.lineItem}
					data={tasks}
					keyExtractor={item => item.id.toString()}
					ListEmptyComponent={<Text style={styles.emptyText}>No Tasks</Text>}
					numColumns={1}
					renderItem={renderTask}
					style={styles.list}
				/>
				<View>
					<TouchableOpacity onPress={onCreateTask} style={styles.fabContainer}>
						<Icon color={Colors.white} name='plus' size={36} />
					</TouchableOpacity>
				</View>
			</View>
			{
				error && Alert.alert(Translations['error.title'], `${error.message}`,
					[{ text: Translations['ok.msg'], onPress: () => { } }])
			}
		</>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: Colors.white,
		...Fonts.body,
	},
	deleteButtonContainer: {
		alignItems: 'center',
		backgroundColor: Colors.red,
		borderRadius: 50,
		color: Colors.secondary,
		height: 20,
		justifyContent: 'center',
		width: 20,
		flex: 2,
		flexDirection: 'row',
	},
	emptyText: {
		color: Colors.secondary,
		textAlign: 'center'
	},
	fabContainer: {
		alignItems: 'center',
		backgroundColor: Colors.primary,
		borderRadius: 50,
		color: Colors.secondary,
		height: 70,
		justifyContent: 'center',
		position: 'absolute',
		width: 70,
		right: 10,
		top: (Dimensions.get('window').height - 200),
		flex: 1,
	},
	lineItemContainer: {
		borderColor: Colors.primary,
		...Fonts.lineItemContainer,
	},
	list: {
		margin: 8,
	}
});

export default MainScreen;
