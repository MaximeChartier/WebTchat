import React, {useEffect, useState, useRef} from 'react';
import { useJsonFetchOrFlash, useToggle, useClickOutside } from '../functions/hooks';
import { SecondaryButton } from './Button.jsx'
import { FetchForm, FormField, FormPrimaryButton } from './Form.jsx'

export default function AddChannel () {
    
    const ref = useRef(null)
    const [modal, toggleModal] = useToggle(false)
    useClickOutside(ref, toggleModal)

    return (
        <>
            <SecondaryButton size='small' onClick={toggleModal}>
                Ajouter une channel
            </SecondaryButton>
            {modal &&
                <FetchForm action='contact' onSuccess={() => console.log('rrr')} className='grid2'>
                    <FormField name='name' required>
                        Votre nom
                    </FormField>
                    <div className='full'>
                        <FormPrimaryButton>Envoyer</FormPrimaryButton>
                    </div>
                </FetchForm>
            }
        </>
    )
}