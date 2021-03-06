/**
 * @format
 */
const TABLE_NAME = 'TD_TASKS';

export const verifyTableExistsSQL = () => {
	return `
		SELECT 
			count(*) 
		FROM sqlite_master 
		WHERE type='table' AND name='${TABLE_NAME}';
	`;
};

export const createTaskTableSQL = () => {
	return `
		CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			description TEXT,
			started TEXT,
			target_completion TEXT,
			actual_completion TEXT,
			in_progress INTEGER DEFAULT 0,
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
			created, 
			updated
		) VALUES (
			"${task.id}",
			"${task.name}",
			"${task.description || null}",
			"${task.started || null}",
			"${task.targetCompletion || null}",
			"${task.actualCompletion || null}",
			${task.inProgress || 0},
			"${task.created || moment().format()}",
			"${task.updated || null}"
		);
	`;
};

export const deleteTaskSQL = id => {
	return `
		DELETE FROM ${TABLE_NAME} WHERE id='${id}';
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
		WHERE id='${id}';
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
			description='${task.description || ''}',
			started='${task.started || ''}',
			target_completion='${task.targetCompletion || ''}',
			actual_completion='${task.actualCompletion || ''}',
			in_progress=${task.inProgress} || 0,
			updated='${task.updated || moment().format()}'
		WHERE
			id='${id}';	
	`;
};
