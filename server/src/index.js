/**
 * @format
 * 
 */
import { stable } from 'core-js';
import { runtime } from 'regenerator-runtime/runtime';
import Express from 'express';
const {
	ApolloServer,
	gql 
} = require('apollo-server-express');
import dotenv from 'dotenv';
import TaskDataSource from './datasource';

dotenv.config();

const typeDefs = gql`
	type Task {
		id: Int!
		name: String!
		description: String
		started: String
		targetCompletion: String
		actualCompletion: String
		inProgress: Boolean!
		created: String!
		updated: String
	}

	type Query {
		task(id: String!): Task
		tasks: [Task]
	}

	type Mutation {
		createTask(name: String!, description: String, targetCompletion: String): Task
		deleteTask(id: String!): Boolean 
		updateTask(task: Task!): Task
	}
`;

const resolvers = {
	Query: {
		task: async (src, { id }, { dataSources }) => {
			return dataSources.task.getTask(id);
		},
		tasks: async (src, args, { dataSources }) => {
			return dataSources.task.getAllTasks();
		},
	},
	Mutation: {
		createTask: async (src, { 
			name, 
			description, 
			targetCompletion 
		}, { dataSources }) => {
			return await dataSources.task.createTask(name, description, targetCompletion);			
		},
		findTask: async (src, { id }, { dataSources }) => {
			return await dataSources.task.findTask(id);
		},
		findAllTasks: async (src, args, {  dataSources }) => {
			return await dataSources.task.findAllTasks();
		},
		deleteTask: async (src, { id }, { dataSources }) => {
			return await dataSources.task.deleteTask(id);
		},
		updateTask: async (src, { task }, { dataSources }) => {
			return await dataSources.tak.updateTask(task);
		},
	},
};

const apolloServer = new ApolloServer({
	dataSources: () => {
		return { task: new TaskDataSource() };
	},
	resolvers,
	typeDefs,
});

const app = Express();
const port = process.env.HOST_PORT || 3000;

apolloServer.applyMiddleware({ app });

app.listen({ port }, () => {
	console.info(`API Endpoint listening at: http://localhost:${port}${apolloServer.graphqlPath}`);
});
