export const sortTodosByTitle = (todos) => {
	const todosArray = Object.entries(todos).map(([id, todo]) => ({ id, ...todo }));

	const sortedTodos = todosArray.sort((a, b) => a.title.localeCompare(b.title));

	return sortedTodos;
};
