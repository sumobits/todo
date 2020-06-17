/**
 * @format
 */
const TABLE_NAME = 'TD_TASKS';

export const createTaskTableSQL = () => {
	return `
		CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL,
			description TEXT,
			started TEXT,
			target_completion TEXT,
			actual_completion TEXT,
			in_progress TEXT 'false' NOT NULL,
			created TEXT,
			updated TEXT
		);
	`;
};

export const createTaskSQL = task => {
	return `
		INSERT INTO ${TABLE_NAME} (
			id,
			name, 
			description,
			started,
			target_completion, 
			actual_completion, 
			in_progress,
			create, 
			updated
		) VALUES (
			"${task.id}",
			"${task.name}",
			"${task.description || null}",
			"${task.started || null}",
			"${task.targetCompletion || null}",
			"${task.actualCompletion || null}",
			"${task.inProgress}",
			"${task.created || moment().format()}",
			"${task.updated || null}"
		);
	`;
};

export const deleteTaskSQL = id => {
	return `
		DELETE FROM ${TABLE_NAME} WHERE id=${id};
	`;
};

export const findTaskSQL = id => {
	return `
		SELECT 
			id, 
			name, 
			description, 
			started,
			target_completion AS targetCompletion,
			actual_completion AS actualCompletion,
			in_progres,
			created,
			updated
		FROM ${TABLE_NAME}
		WHERE id=${id};
	`;
};

export const findTasksSQL = () => {
	return `
		SELECT 
			id, 
			name, 
			description, 
			started,
			target_completion AS targetCompletion,
			actual_completion AS actualCompletion,
			in_progress,
			created,
			updated
		FROM ${TABLE_NAME};
	`;
};

export const updateTaskSQL = task => {
	return `
		UPDATE ${TABLE_NAME}
		SET 
			name='${task.name}',
			description='${task.description}',
			started='${task.started}',
			target_completion='${task.targetCompletion}',
			actual_completion='${task.actualCompletion}',
			in_progress='${task.inProgress}',
			created='${task.created}',
			updated='${task.updated}'
		WHERE
			id=${id};	
	`;
};
