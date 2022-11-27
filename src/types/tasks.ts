export type Task = {
	title: string;
	description: string;
	dueDate: string;
	id: string;
	attachedFiles: [];
}

export type TasksListActions = {
	deleteTask: (id: string) => void;
    editTitle: (id: string, title: string) => void;
}