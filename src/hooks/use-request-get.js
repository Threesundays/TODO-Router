import { useEffect, useState } from 'react';

export const useRequestGet = (refreshTodosFlag) => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((json) => {
				setTodos(json);
			});
	}, [refreshTodosFlag]);
	return {
		todos,
		setTodos
	};
};
