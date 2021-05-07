import React from 'react';
import Main from './Main';
import { ModalDialog } from '@sb-elements/all'
import Header from './elements/Header';

customElements.define('modal-dialog', ModalDialog)

export default () => {
    
    return (
        <div className="stack">
            <header className="header bb">
                <Header></Header>
            </header>
            <div className='container'>
                <Main />
            </div>
            <footer className="footer bt">
                footer
            </footer>
        </div>
    );
}
