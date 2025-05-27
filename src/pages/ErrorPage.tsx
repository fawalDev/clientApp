import { useRouteError } from 'react-router';
import styles from './ErrorPage.module.css';
import ErrorRes from '../models/errorResponse';
import Navbar from '../components/Navbar';

export default function ErrorPage() {
    const error = useRouteError() as ErrorRes

    const message = error.message || error.name || 'No dectected Error'
    const status = error.status || 500
    // Check if error.cause is an object and has keys
    const keys = Object.keys(error.cause || {})

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Error occured!</h1>
                <div className={styles.detail}><strong>Message:</strong> {message}</div>
                {status && <div className={styles.detail}><strong>Status:</strong> {status}</div>}
                {keys.length > 0 && keys.map((key) =>
                    <div key={key} className={styles.detail}>{error.cause && error.cause[key] || 'No details available'}</div>)}
            </div>
        </>
    );
};


