export const useRequestAdd = (refreshTodos) => {
	const requestAdd = (data) => {
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача добавлена');
				refreshTodos();
			});
	};

	return { requestAdd };
};
