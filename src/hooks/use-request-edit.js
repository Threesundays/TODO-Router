

export const useRequestEdit = (refreshTodos) => {


	const requestEdit = (id, data) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача обновлена');
				refreshTodos();
			});
	};

	return { requestEdit };
};
