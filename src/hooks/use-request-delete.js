import { useState } from 'react';

export const useRequestDelete = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [shouldRedirect, setShouldRedirect] = useState(false);
	

	const requestDelete = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача удалена');
				refreshTodos();
				setShouldRedirect(true);
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		requestDelete,
		shouldRedirect,
	};
};
