import React from 'react';
import Main from './Main';


export default () => {

    return (
        <div className="app">
            <header className="header">
                <h1>header</h1>
            </header>
            <main className='main'>
                <Main />
            </main>
            <footer className="footer">
                footer
            </footer>
        </div>
    );
}
