import React, { useState } from 'react';
import { useToggle } from '../functions/hooks';
import { Modal } from '../components/Modal'
import { FetchForm, FormField, FormPrimaryButton } from '../components/Form'

export default function Message ({ message, localUser }) {

  let messageClass = 'message mx3 mb1'
  const [modal, toggleModal] = useToggle(false)
  const [m , setM] = useState(message)

  if(localUser.id.indexOf(message.user_id) > -1) {
    messageClass = messageClass + ' message-me'
  }

  const onModified = async (modifiedMessage) => {
    toggleModal()
    setM(modifiedMessage)
  }
  
  return (
    <div className={messageClass}>
      <div className="icon mx2">
        <img height="40px" src={`https://s.gravatar.com/avatar/${m.gravatarId}`} alt=""/>
      </div>
      <div className="content">
        <span className="author">{m.username}</span>
        <span className="date">{(new Date(m.created_at)).toUTCString()}</span>
        <div className="text mt1">{m.content}</div>
        {localUser.id.indexOf(m.user_id) > -1 &&
        <div className='flex'>
          <div></div>
          <div>          
            <button className='btn-secondary btn-extrasmall' onClick={toggleModal}>Modifier</button>
            {modal &&
                <Modal>
                    <FetchForm action={`messages/${m.id}`} method='PUT' onSuccess={onModified} className="stack">
                        <FormField text='textarea' name='content' required>
                            Message
                        </FormField>
                        <div>
                            <FormPrimaryButton>Modifier</FormPrimaryButton>
                        </div>
                    </FetchForm>
                </Modal>
            }
            <ajax-delete class='btn-danger btn-extrasmall ml1' url={`messages/${m.id}`}>Supprimer</ajax-delete>
          </div>
        </div>}
      </div>
    </div>
  )
}