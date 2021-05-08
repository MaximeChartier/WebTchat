import React, { useState } from 'react';

export default function Message ({ message, localUser }) {

  let messageClass = 'message mx3 mb1'

  if(localUser.id.indexOf(message.user_id) > -1) {
    messageClass = messageClass + ' message-me'
  }
  
  return (
    <div className={messageClass}>
      <div className="icon mx2">
        <img height="40px" src={`https://s.gravatar.com/avatar/${message.gravatarId}`} alt=""/>
      </div>
      <div className="content">
        <span className="author">{message.username}</span>
        <span className="date">{(new Date(message.created_at)).toUTCString()}</span>
        <div className="text mt1">{message.content}</div>
        {localUser.id.indexOf(message.user_id) > -1 &&
        <div className='flex'>
          <div></div>
          <div>          
            <ajax-delete class='btn-secondary btn-extrasmall' url={`messages/${message.id}`}>Modifier</ajax-delete>
            <ajax-delete class='btn-danger btn-extrasmall' url={`messages/${message.id}`}>Supprimer</ajax-delete>
          </div>
        </div>}
      </div>
    </div>
  )
}