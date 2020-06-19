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
} from './sql';

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

		this.db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err, obj) => {
			if (err) {
				return console.error(`Failed to open database: ${err}`);
			}

			console.info('Successfully opened database.');
			this.db.run(createTaskTableSQL());
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
			name,
			description,
			targetCompletion,
			actualCompletion: null,
			created: moment().format(),
			updated: null,
		};
		const sql = createTaskSQL(task);

		try {
			return await this.db.run(createTaskSQL);
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
			return await this.db.run(sql);
		} catch (err) {
			return console.error(`Error deleting task [${id}]: ${err.message}`);
		}
	}

	findTask = async id => {
		if (!this.db || !id) {
			return;
		}

		const sql = findTaskSQL(id);

		try {
			const row = await this.db.get(sql);
			return convertRowToTask(row);
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
			const rows = await this.db.all(sql);
			if(rows) {

			}
			const tasks = map(rows, row => {
				return convertRowToTask(row);
			});
			return tasks;
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
			const row = await this.db.run(sql);
			const task = convertRowToTask(row);
			return task;
		} catch (err) {
			return console.error(`Error updating task [${task.id}]: ${err.message}`);
		}
	}
}

export default TaskDataSource;
