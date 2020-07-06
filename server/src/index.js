/**
 * @format
 * 
 */
import { stable } from 'core-js';
import { runtime } from 'regenerator-runtime/runtime';
import readline from 'readline';
import Express from 'express';
const {
	ApolloServer,
	gql 
} = require('apollo-server-express');
import dotenv from 'dotenv';
import TaskDataSource from './datasource';

global.Blob = null;

dotenv.config();

const dataSource = new TaskDataSource();

const typeDefs = gql`
	type Task {
		id: String!
		name: String!
		description: String
		started: String
		targetCompletion: String
		actualCompletion: String
		inProgress: Int
		created: String!
		updated: String
	}

	input UpdateTask {
		id: Int!
		name: String
		description: String
		started: String
		targetCompletion: String
		actualCompletion: String
		inProgress: Boolean
	}

	type Query {
		findTask(id: String!): Task
		findAllTasks: [Task]
	}

	type Mutation {
		createTask(name: String!, description: String, targetCompletion: String): Task
		deleteTask(id: String!): Boolean 
		updateTask(task: UpdateTask!): Task
	}
`;

const resolvers = {
	Query: {
		findTask: async (src, { id }, { dataSources }) => {
			return await dataSources.task.findTask(id) || {};
		},
		findAllTasks: async (src, args, { dataSources }) => {
			return await dataSources.task.findAllTasks() || [];
		},
	},
	Mutation: {
		createTask: async (src, { 
			name, 
			description, 
			targetCompletion 
		}, { dataSources }) => {
			return await dataSources.task.createTask(name, description, targetCompletion) || {};			
		},
		deleteTask: async (src, { id }, { dataSources }) => {
			return await dataSources.task.deleteTask(id) || true;
		},
		updateTask: async (src, { task }, { dataSources }) => {
			return await dataSources.tak.updateTask(task) || {};
		},
	},
};

const apolloServer = new ApolloServer({
	dataSources: () => {
		return { task: dataSource };
	},
	resolvers,
	typeDefs,
});

const app = Express();
const port = process.env.HOST_PORT || 3000;

apolloServer.applyMiddleware({ app });

app.listen({ port }, () => {
	console.info(`API Endpoint listening at: http://localhost:${port}${apolloServer.graphqlPath}`);

	process.on('SIGINT', () => {
		console.warn('Caught interrupt signal');
		dataSource.close();
		process.exit();
	});
});

if (process.platform === 'win32') {
	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	reader.on('SIGINT', () => {
		process.emit('SIGINT');
	});
}
