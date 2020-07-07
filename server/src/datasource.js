/**
 * @format
 */
import sqlite from 'sqlite-async';
import { DataSource } from 'apollo-datasource';
import moment from 'moment';
import map from 'lodash/map';
import {
	createTaskTableSQL,
	createTaskSQL,
	deleteTaskSQL,
	findTaskSQL,
	findTasksSQL,
	updateTaskSQL,
	verifyTableExistsSQL,
} from './sql';
import Locker from './locker';

const convertRowToTask = row => {
	if (!row) {
		return;
	}

	return {
		id: row.id,
		name: row.name,
		description: row.description,
		targetCompletion: row.targetCompletion,
		actualCompletion: row.actualCompletion,
		created: row.created,
		updated: row.updated
	};
};

class TaskDataSource extends DataSource {
	constructor (logger) {
		super();
		this.logger = logger;
		this.db = undefined;
	}

	open = async () => {
		this.logger.log({
			level: 'debug',
			message: 'Attempting to open database',
		});

		try {
			this.db = await sqlite.open('./sumobits.todo.db',
				(sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE));
			await this.db.run(createTaskTableSQL());
			await this.db.run(verifyTableExistsSQL());
		} catch(err) {
			this.logger.log({
				level: 'error',
				message: `Failed to open database: ${err}`,
			});
			throw err;
		}

		this.logger.log({
			level: 'info',
			message: 'Successfully opened database.',
		});
	}

	close = async () => {
		if (!this.db) {
			return;
		}

		try {
			await this.db.close();
		} catch(err) {
			this.logger.log({
				level: 'error',
				message: `Error closing database: ${err}`,
			});
		}
	}

	createTask = async (name, description, targetCompletion) => {
		if (!this.db) {
			return;
		}

		if (!name) {
			throw new Error('name is required when creating a task');
		}

		const task = {
			id: Locker.generateUniqueId(false),
			name,
			description,
			targetCompletion,
			actualCompletion: null,
			created: moment().format(),
			updated: null,
		};

		const sql = createTaskSQL(task);

		this.logger.log({
			level: 'debug',
			message: `Creating table as ${sql}`
		});

		try {
			await this.db.run(sql);
			return task;
		} catch (err) {
			this.logger.log({
				level: 'error',
				message: `Error creating task: ${err.message}`,
			});

			throw err;
		}
	}

	deleteTask = async id => {
		if (!this.db) {
			return;
		}

		if (!id) {
			throw new Error('id is required to delete task.');
		}

		const sql = deleteTaskSQL(id);

		this.logger.log({
			level: 'debug',
			message: `Deleting task as ${sql}`
		});

		try {
			await this.db.run(sql);
			return true;
		} catch (err) {
			this.logger.log({
				level: 'error',
				message: `Error deleting task [${id}]: ${err.message}`
			});
			return false;
		}
	}

	findTask = async id => {
		if (!this.db || !id) {
			return;
		}

		const sql = findTaskSQL(id);

		this.logger.log({
			level: 'debug',
			message: `Searching for task as: ${sql}`
		});

		try {

			const result = await this.db.get(sql);
			return convertRowToTask(result.rows);
		} catch (err) {
			this.logger.log({
				level: 'error',
				message: `Error finding task[${id}]: ${err.message}`,
			});

			return err;
		}
	}

	findAllTasks = async () => {
		if (!this.db) {
			return;
		}

		const sql = findTasksSQL();

		this.logger.log({
			level: 'debug',
			message: `Retrieving all tasks ${sql}`,
		});

		try {
			const result = await this.db.all(sql);
			if(result) {
				this.logger.log({
					level: 'debug',
					message: `Found ${result.length} task records`,
				});
				
				return map(result, row => {
					return convertRowToTask(row);
				});
			}
		} catch (err) {
			this.logger.log({
				level: 'error',
				message: `Error finding tasks: ${err.message}`,
			});
			return err;
		}
	}

	updateTask = async task => {
		if (!this.db) {
			return;
		}

		if(!task) {
			throw new Error('task is required for updates');
		}

		task.updated = moment().format();

		const sql = updateTaskSQL(task);

		this.logger.log({
			level: 'debug',
			message: `Updating task as ${sql}`,
		});
		
		try {
			const row = await this.db.run(sql);
			return convertRowToTask(row);
		} catch (err) {
			this.logger.log({
				level: 'error',
				message: `Error updating task [${task.id}]: ${err.message}`,
			});
			return err;
		}
	}
}

export default TaskDataSource;
