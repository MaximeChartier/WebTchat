import React from 'react';
import { FetchForm, FormField, FormPrimaryButton } from '../components/Form.jsx'
import { useToggle } from '../functions/hooks';
import { PrimaryButton } from '../components/Button.jsx'
import { Modal } from '../components/Modal.jsx'

export default function  SignIn ({signinSuccess}){

    const [signinModal, toggleSinginModal] = useToggle(false)

	return (
        <>
            <PrimaryButton size='small' onClick={toggleSinginModal}>
                Se connecter
            </PrimaryButton>
            {signinModal &&
                <Modal>
                    <FetchForm action="login" onSuccess={signinSuccess}>
                        <div className="stack">
                            <FormField type='text' name='email' required>Email</FormField>
                            <FormField type="password" name='password' required>Mot de passe</FormField>
                            <FormPrimaryButton>Se connecter</FormPrimaryButton>
                        </div>
                    </FetchForm>
                </Modal>}
            </>
    )
};
