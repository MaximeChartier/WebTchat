import React from 'react';
import Main from './Main';
import { ModalDialog } from '@sb-elements/all'

customElements.define('modal-dialog', ModalDialog)

export default () => {

    return (
        <div className="stack">
            <header className="header">
                <h1>header</h1>
            </header>
            <div className='container'>
                <Main />
            </div>
            <footer className="footer">
                footer
            </footer>
        </div>
    );
}
