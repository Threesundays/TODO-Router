export const sortTodosByTitle = (todos) => {
    const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
    return sortedTodos;
  };
