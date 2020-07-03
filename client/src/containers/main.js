/**
 * @format
 */
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { NavigatorContext } from '../contexts';
import MainView from '../components/views/main';

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

const MainContainer = () => {
	const {
		error,
		data,
		loading,
	} = useQuery(FIND_TASKS_QUERY);
	const tasks = ( data && data.findAllTasks ? data.findAllTasks : [] );
	const contextValue = {
		error,
		loading,
		tasks,
	};

	return (
		<NavigatorContext.Provider value={contextValue}>
			<MainView />
		</NavigatorContext.Provider>
	);
};

export default MainContainer;
