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
                      <FormField type="text" name="gravatarId" required>ID Gravatar</FormField>
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
