import React, {useState} from 'react';
import { FetchForm, FormField, FormPrimaryButton } from './components/Form.jsx'

export default function  MessageSend ({ addMessage}){
	const [content, setContent] = useState('');

	const onSuccess = (rep) => {
		console.log(rep)
	}

	return (
		<FetchForm action='' onSuccess={onSuccess}>
			<div className="flex center">
				<div className='mr1'>
					<FormField type='textarea' id='form-message' name='name' required>
					 Ajouter un commentaire
					</FormField>
				</div>
				<div>
					<FormPrimaryButton>Envoyer</FormPrimaryButton>
				</div>
			</div>
		</FetchForm>)
};
