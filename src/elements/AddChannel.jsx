import React, { useRef, useEffect, useState } from 'react';
import { useToggle, useClickOutside } from '../functions/hooks';
import { SecondaryButton } from '../components/Button.jsx';
import { FetchForm, FormField, FormPrimaryButton } from '../components/Form.jsx';
import { Modal } from '../components/Modal.jsx';

export default function AddChannel({ handleSuccess }) {
  const ref = useRef(null);
  const [modal, toggleModal] = useToggle(false);
  useClickOutside(ref, toggleModal);

  const [localUser, setLocalUser] = useState({});
  const [localUserLodded, setLocalUserLodded] = useState(false);

  useEffect(async () => {
    const u = localStorage.getItem('user');
    if (u) {
      const t = JSON.parse(u);
      if (t.name) {
        setLocalUser(t);
        setLocalUserLodded(true);
      }
    }
  }, [localUserLodded]);

  const onSuccess = async (rep) => {
    toggleModal();
    rep.members = [
      {
        name: localUser.name,
        id: localUser.id,
      },
    ];
    handleSuccess(rep);
  };

  return (
    <>
      <SecondaryButton size="small" className="btn btn-secondary btn-small center w100" onClick={toggleModal}>
        Ajouter une channel
      </SecondaryButton>
      {modal
                && (
                <Modal>
                  <FetchForm action="channels" onSuccess={onSuccess} className="stack">
                    <FormField name="name" required>
                      Nom du fil de discussion
                    </FormField>
                    <div>
                      <FormPrimaryButton>Envoyer</FormPrimaryButton>
                    </div>
                  </FetchForm>
                </Modal>
                )}
    </>
  );
}
