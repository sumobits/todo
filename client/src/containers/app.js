/**
 * @format
 */
import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { LoadingIndicator } from '../components/common';
import MainView from '../components/mainview';

const FIND_TASKS_QUERY = gql`
	query findAllTasks{
		findAllTasks {
			id
			name
			description
			inProgress
		}	
	}
`;

const AppContainer = () => {
	const [
		tasks,
		setTasks
	] = useState([]);

	const {
		error,
		data,
		loading,
	} = useQuery(FIND_TASKS_QUERY, {
		onCompleted: (data) => {
			console.debug(`Fetched tasks: ${JSON.stringify(data)}`);
			setTasks(data.tasks);
		},
		onError: (err) => {
			console.error(`Error fetching tasks: ${err.message}`);
		},
	});


	if (loading) {
		return (
			<LoadingIndicator />
		);
	}

	if (error) {
		console.error(`Error encountered fetching tasks: ${error}`);
	}

	return <MainView />;
};

export default AppContainer;
