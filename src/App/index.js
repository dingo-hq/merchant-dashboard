import React from 'react';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import styles from './styles.module.css';

function App() {
    return (
        <section className={styles.container}>
            <Sidebar />
            <Main />
        </section>
    );
}

export default App;
