import React, { useEffect, useState } from 'react';
import Message from './Message';

export default function Messages ({ messages }) {
  const [localUser, setLocalUser] = useState({})
  const [localUserLodded, setLocalUserLodded] = useState(false)

  useEffect(async () => {
    const u = localStorage.getItem('user')
    if(u){
      const t = JSON.parse(u)
      if(t.name){
        setLocalUser(t)
        setLocalUserLodded(true)
      }
    }
  }, [localUserLodded])

  return (
    <div className='stack messages'>
      {localUser && messages.map((message, i) => (
          <Message key={i} localUser={localUser} message={message}/>
      ))}
    </div>
  )
}