/**
 * @format
 */
import sqlite3 from 'sqlite3';
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
	constructor () {
		super();
		console.info('Attempting to open database');

		this.db = new sqlite3.Database(':memory:', (err, obj) => {
			if (err) {
				console.error(`Failed to open database: ${err}`);
				throw err;
			}

			console.info('Successfully opened database.');
			this.db.exec(createTaskTableSQL(), err => {
				if (err) {
					console.error(`Failed to create task table: ${err.message}`);
				}
			});
			this.db.exec(verifyTableExistsSQL(), err => {
				if (err) {
					console.error(`Failed to verify task table: ${err.message}`);
				}
			});
		});
	}

	close = () => {
		if (!this.db) {
			return;
		}

		this.db.close( err => console.error(`Error closing database: ${err}`) );
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

		try {
			await this.db.exec(createTaskSQL(task));
			return task;
		} catch (err) {
			return console.error(`Error creating task: ${err.message}`);		}
	}

	deleteTask = async id => {
		if (!this.db) {
			return;
		}

		if (!id) {
			throw new Error('id is required to delete task.');
		}

		const sql = deleteTaskSQL(id);

		try {
			await this.db.exec(sql);
			return true;
		} catch (err) {
			console.error(`Error deleting task [${id}]: ${err.message}`);
			return false;
		}
	}

	findTask = async id => {
		if (!this.db || !id) {
			return;
		}

		const sql = findTaskSQL(id);

		try {
			const result = await this.db.query(sql);
			return convertRowToTask(result.rows);
		} catch (err) {
			return console.error(`Error finding task[${id}]: ${err.message}`);
		}
	}

	findAllTasks = async () => {
		if (!this.db) {
			return;
		}

		const sql = findTasksSQL();

		try {
			const result = await this.db.exec(sql);
			if(result.rows) {
				console.log(`found ${result.rows} task records`);
				return map(result.rows, row => {
					return convertRowToTask(row);
				});
			}
		} catch (err) {
			return console.error(`Error finding tasks: ${err.message}`);
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

		try {
			const row = await this.db.exec(sql);
			return convertRowToTask(row);
		} catch (err) {
			return console.error(`Error updating task [${task.id}]: ${err.message}`);
		}
	}
}

export default TaskDataSource;
