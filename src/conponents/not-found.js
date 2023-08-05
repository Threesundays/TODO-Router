import styles from './not-found.module.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>404</h1>
			<h2 className={styles.h2}>Page Not Found</h2>
			<p className={styles.p}>
				The Page you are looking for doesn't exist or an other error occured. Go
				to 
                <Link to={`/tasks`}> Home Page.</Link>
			</p>
		</div>
	);
};
