import { Input } from '../conponents';
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useRequestDelete, useRequestEdit } from '../hooks';
import styles from '../app.module.css';

export const TodoDetails = ({ todos, refreshTodos }) => {
	const [showForm, setShowForm] = useState(false);
	const [inputEditValue, setInputEditValue] = useState('');
	const [editingTaskId, setEditingTaskId] = useState(null);
	

	const { requestDelete, shouldRedirect } = useRequestDelete(refreshTodos);
	const { requestEdit } = useRequestEdit(refreshTodos, setEditingTaskId);

	const params = useParams();
	const todo = todos.find((todo) => todo.id.toString() === params.id);

	if (!todo) {
		return (
			<div>
				<Navigate to="/404" />
			</div>
		);
	}

	if (shouldRedirect) {
		return <Navigate to="/tasks" />;
	  }

	const handleOpenEditForm = (id, title) => {
		setEditingTaskId(id);
		setInputEditValue(title);
		setShowForm(!showForm);
	};

	const onSubmitEditForm = (event) => {
		event.preventDefault();
		const submitData = { title: inputEditValue };
		requestEdit(editingTaskId, submitData);
		setShowForm(!showForm);
	};

	return (
		<div>
			<Link to="/tasks">
				<button>назад</button>
			</Link>
			<div className={styles.todoList}>
				{todo.title}
				<div>
					<button onClick={() => requestDelete(todo.id)}>✘</button>
					<button onClick={() => handleOpenEditForm(todo.id, todo.title)}>
						✎
					</button>
				</div>
				{showForm && editingTaskId === todo.id && (
					<div>
						<form onSubmit={onSubmitEditForm}>
							<Input
								type="text"
								value={inputEditValue}
								onChange={(event) =>
									setInputEditValue(event.target.value)
								}
							/>
							<button type="submit">Редактировать</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};
