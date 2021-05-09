import React, { useEffect, useState } from 'react';
import { useToggle } from '../functions/hooks';
import { SecondaryButton } from '../components/Button.jsx';
import { FetchForm, FormField, FormPrimaryButton } from '../components/Form.jsx';
import { Modal } from '../components/Modal.jsx';

export default function AccoutSettings({ userUpdated }) {
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
  const [modal, toggleModal] = useToggle(false);

  const onSuccess = async (rep) => {
    toggleModal();
    rep.access_token = localUser.access_token;
    userUpdated(rep);
    setLocalUserLodded(false);
  };

  return (
    <>
      <SecondaryButton size="small" className="btn btn-secondary btn-small center w100" onClick={toggleModal}>
        Paramètres
      </SecondaryButton>
      {modal
                && (
                <Modal>
                  <FetchForm action={`users/${localUser.id}`} method="PUT" onSuccess={onSuccess} className="stack">
                    <FormField name="name" defaultValue={localUser.name} required>
                      Username
                    </FormField>
                    <FormField name="email" defaultValue={localUser.email} required>
                      Email
                    </FormField>
                    <FormField name="gravatarId" defaultValue={localUser.gravatarId} required>
                      ID gravatar
                    </FormField>
                    <FormField type="checkbox" name="darkTheme" defaultChecked={localUser.darkTheme}>
                      Theme dark
                    </FormField>
                    <div>
                      <FormPrimaryButton>Modifier mon compte</FormPrimaryButton>
                    </div>
                  </FetchForm>
                </Modal>
                )}
    </>
  );
}
