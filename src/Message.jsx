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
      </div>
    </div>
  )
}