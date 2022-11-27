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
    changePopupTask: (id: string) => void;
}

export type TaskPopupActions = {
    editTitle: (id: string, title: string) => void;
    editDescription: (id: string, description: string) => void;
}