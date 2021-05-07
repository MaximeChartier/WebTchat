import React, {useEffect, useState, useRef} from 'react';
import { useJsonFetchOrFlash, useToggle, useClickOutside } from '../functions/hooks';
import { SecondaryButton } from './Button.jsx'
import { FetchForm, FormField, FormPrimaryButton } from './Form.jsx'
import { Modal } from './Modal.jsx'

export default function AddChannel ({handleSuccess}) {
    
    const ref = useRef(null)
    const [modal, toggleModal] = useToggle(false)
    useClickOutside(ref, toggleModal)

    const onSuccess = async(rep) => {
        toggleModal()
        handleSuccess(rep)
    }

    return (
        <>
            <SecondaryButton size='small' class="btn btn-secondary btn-small center w100" onClick={toggleModal}>
                Ajouter une channel
            </SecondaryButton>
            {modal &&
                <Modal>
                    <FetchForm action='channels' onSuccess={onSuccess} className="stack">
                        <FormField name='name' required>
                            Nom du fil de discussion
                        </FormField>
                        <div>
                            <FormPrimaryButton>Envoyer</FormPrimaryButton>
                        </div>
                    </FetchForm>
                </Modal>
            }
        </>
    )
}