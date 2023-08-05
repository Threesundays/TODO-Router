import { useState } from 'react';
import styles from './app.module.css';
import { TodoSummary, TodoDetails, NotFound } from './conponents';
import { useRequestGet } from './hooks';
import { Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag((prevFlag) => !prevFlag);

	const [selectedTodoId, setSelectedTodoId] = useState(null);
	

	const { todos, setTodos } = useRequestGet(refreshTodosFlag);

	const [filteredTodos, setFilteredTodos] = useState(todos);

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/tasks"
					element={
						<TodoSummary
							setFilteredTodos={setFilteredTodos}
							setTodos={setTodos}
							todos={todos}
							filteredTodos={filteredTodos}
							setSelectedTodoId={setSelectedTodoId}
							refreshTodos={refreshTodos}
						/>
					}
				/>

				<Route
					path="/tasks/:id"
					element={<TodoDetails todos={todos} refreshTodos={refreshTodos} />}
				/>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
