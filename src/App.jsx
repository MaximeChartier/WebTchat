import React, { useState } from 'react';
import Main from './Main';
import { ModalDialog } from '@sb-elements/all'
import Header from './elements/Header';

customElements.define('modal-dialog', ModalDialog)

export default () => {
    
    const [logged, setLogged] = useState(false)

    return (
        <div className="stack">
            <header className="header bb">
                <Header logged={setLogged}></Header>
            </header>
            <div className='container'>
                {logged ?  <Main /> : 'Veuillez vous connecter'}
            </div>
            <footer className="footer bt">
            </footer>
        </div>
    );
}
