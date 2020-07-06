/**
 * @format
 */
import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NavigatorContext } from '../contexts';
import MainView from '../components/views/main';

const CREATE_TASK = gql`
	mutation createTask($name: String!,
		 $description: String, 
		 $targetCompletion: String) {
		
		createTask(name: $name, 
			description: $description, 
			targetCompletion: $targetCompletion) {
				name
				description
				targetCompletion
				inProgress
			}
	}
`;

const DELETE_TASK = gql`
	mutation deleteTask($id: String!) {
		deleteTask(id: $id)
	}
`;

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

const UPDATE_TASK = gql`
	mutation updateTask($task: UpdateTask!) {
		updateTask(task: $task) {
				id
				name
				description
				targetCompletion
				inProgress
			}
	}
`;

const MainContainer = () => {
	const [ error, setError ] = useState();
	const [ loading, setLoading ] = useState(false);
	const [ activeTask, setActiveTask ] = useState();
	const [ tasks, setTasks ] = useState();
	const {
		loading: queryLoading,
	} = useQuery(FIND_TASKS_QUERY, {
		onCompleted: data => {
			setError(undefined);
			setLoading(false);
			setTasks(data.finaAllTasks);
		},
		onError: e => {
			setError(e);
			setLoading(false);
		}
	});
	const [createTask, {
		loading: createLoading,
	}] = useMutation(CREATE_TASK, {
		onCompleted: data => {
			if (data) {
				setActiveTask(data.createTask);
				setError(undefined);
				setLoading(false);
			}
		},
		onError: error => {
			setError(error);
			setLoading(false);
		}
	});
	const [deleteTask, {
		loading: deleteLoading,
	}] = useMutation(DELETE_TASK, {
		onCompleted: () => {
			console.log(`Successfully deleted task ${id}`);
		},
		onError: error => {
			console.warn(`Error deleting task ${id}: ${error.message} `);
			setError(error);
		}
	});
	const [updateTask, {
		loading: updateLoading,
	}] = useMutation(UPDATE_TASK, {
		onCompleted: data => {
			setActiveTask(data.updateTask);
			setError(undefined);
			setLoading(false);
		},
		onError: error => {
			setError(error);
			setLoading(false);
		}
	});

	const contextValue = {
		activeTask,
		error,
		loading: (queryLoading || createLoading || deleteLoading || updateLoading),
		onDelete: id => {
			deleteTask({ variables: { id } });
		},
		onSave: t => {
			setActiveTask(t);
			
			if(t.id) {
				updateTask({
					variables: {
						id: t.id,
						name: t.name,
						description: t.description,
						started: t.started,
						targetCompletion: t.targetCompletion,
						actualCompletion: t.actualCompletion,
						inProgress: t.inProgress,
					}
				});	
			} else {
				createTask({
					variables: {
						name: t.name,
						description: t.description || null,
						targetCompletion: t.targetCompletion || null,
					}
				});
			}
		},
		tasks,
	};

	return (
		<NavigatorContext.Provider value={contextValue}>
			<MainView />
		</NavigatorContext.Provider>
	);
};

export default MainContainer;
