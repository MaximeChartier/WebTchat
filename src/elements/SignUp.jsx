import React, { useState } from 'react';
import { FetchForm, FormField, FormPrimaryButton } from '../components/Form.jsx';
import { useToggle, useJsonFetchOrFlash } from '../functions/hooks';
import { PrimaryButton } from '../components/Button.jsx';
import { Modal } from '../components/Modal.jsx';

export default function SignUp({ signupSuccess }) {
  const [signupModal, toggleSingupModal] = useToggle(false);
  const { fetch: getToken } = useJsonFetchOrFlash();
  const [passwordInput, setPasswordInput] = useState('');

  const success = async (rep) => {
    const user = await getToken('login', {
      method: 'post',
      body: {
        email: rep.email,
        password: passwordInput.target.value,
      },
    });
    signupSuccess(user);
  };

  return (
    <>
      <PrimaryButton size="small" onClick={toggleSingupModal}>
        S'inscrire
      </PrimaryButton>
      {signupModal
                && (
                <Modal>
                  <FetchForm action="users" onSuccess={success}>
                    <div className="stack">
                      <FormField name="name" required>Username</FormField>
                      <FormField type="text" name="gravatarId" id="gravatarUrl" required>ID Gravatar</FormField>
                      Vous pouvez aussi choisir un avatar 
                      <div className="center">
                        {Array(8).fill(1).map((t,i) =>
                          <img className="px1" src={`https://www.gravatar.com/avatar/${i}?s=32&d=identicon&r=PG`} onClick={() => document.getElementById('gravatarUrl').value = `${i}?s=32&d=identicon&r=PG`}/>
                        )}
                      </div>
                      <FormField type="text" name="email" required>Email</FormField>
                      <FormField type="password" name="password" onInput={setPasswordInput} required>Mot de passe</FormField>
                      <FormPrimaryButton>S'inscrire</FormPrimaryButton>
                    </div>
                  </FetchForm>
                </Modal>
                )}
    </>
  );
}
