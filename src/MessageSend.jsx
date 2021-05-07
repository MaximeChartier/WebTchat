import React, {useState} from 'react';
import { FetchForm, FormField, FormPrimaryButton } from './components/Form.jsx'

export default function  MessageSend ({ channel, addMessage }){
	const [content, setContent] = useState('');

	const onSuccess = (rep) => {
		addMessage({
			channel_id: channel.id,
			author: 'max',
			creation: '',
			content: 'flskdjelfkj'
		})
	}

	return (
		<FetchForm action="messages" onSuccess={onSuccess}>
			<div className="flex center">
				<div className='mr1'>
					<FormField type='textarea' id='form-message' name='content' required>
						Ajouter un commentaire
					</FormField>
					<input type="hidden" name="channel_id" value={channel.id}></input>
				</div>
				<div>
					<FormPrimaryButton>Envoyer</FormPrimaryButton>
				</div>
			</div>
		</FetchForm>)
};
