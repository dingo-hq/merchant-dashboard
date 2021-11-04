import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles.module.css';

function App() {
    return (
        <section className={styles.container}>
            <Sidebar />
            <main className={styles.main}>Main content</main>
        </section>
    );
}

export default App;
