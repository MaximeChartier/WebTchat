import React, { useState } from 'react';
import Main from './Main';
import { ModalDialog } from '@sb-elements/all'
import Header from './elements/Header';
import { AjaxDelete } from './components/AjaxDelete';

customElements.define('modal-dialog', ModalDialog)
customElements.define('ajax-delete', AjaxDelete)

export default () => {
    
    const [logged, setLogged] = useState(false)

    return (
        <div className="stack">
            <header className="header bb">
                <Header logged={setLogged}></Header>
            </header>
            <div className='container'>
                {logged ?  <Main /> : 
                <div className='flex'>
                    <div>
                        <h1 className="h1">Bonjour</h1>
                        <p className="m3">
                            Inscrivez vous ou identifiez vous pour commencer a chatter.
                        </p>
                    </div>
                    <div className="m3">
                        <h1 className="h3">Pour patienter</h1>
                        une photos de chat :
                        <img className="mt2" src="https://placekitten.com/1000/500" alt=""/>
                    </div>
                </div>
                }
            </div>
            <footer className="footer bt">
            </footer>
        </div>
    );
}
