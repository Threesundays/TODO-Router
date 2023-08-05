import styles from '../app.module.css';
import { sortTodosByTitle } from '../helpers';
import { MAX_LENGTH } from '../constants';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequestAdd } from '../hooks';
import { Input } from '../conponents';

export const TodoSummary = ({
	setFilteredTodos,
	todos,
	filteredTodos,
	refreshTodos,
	setTodos,
}) => {
	const [inputValue, setInputValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [searchInputValue, setSearchInputValue] = useState('');

	const { requestAdd } = useRequestAdd(refreshTodos);

	const onSubmit = (event) => {
		event.preventDefault();
		const submitData = { title: inputValue };
		requestAdd(submitData);
		setInputValue('');
	};

	const toggleSort = () => {
		if (!isSorted) {
			const sortedTodos = sortTodosByTitle(todos);
			setTodos(sortedTodos);
			setIsSorted(true);
		} else {
			refreshTodos();
			setIsSorted(false);
		}
	};

	useEffect(() => {
		const filteredList = todos.filter((todo) =>
			todo.title.toLowerCase().includes(searchInputValue),
		);
		setFilteredTodos(filteredList);
	}, [searchInputValue, todos]);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<Input
					name="todo"
					type="text"
					placeholder="Введите задачу"
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
				/>
				<button>✔</button>
			</form>
			<form>
				<Input
					name="search"
					type="text"
					placeholder="Поиск"
					value={searchInputValue}
					onChange={(event) => setSearchInputValue(event.target.value)}
				/>
			</form>
			<button onClick={toggleSort}>Abc 🠗</button>
			<ol className={styles.todoList}>
				{filteredTodos.map(({ id, title }) => (
					<li key={id}>
						<Link to={`/tasks/${id}`}>
							{title.length > MAX_LENGTH
								? title.slice(0, MAX_LENGTH) + '...'
								: title}
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
};
