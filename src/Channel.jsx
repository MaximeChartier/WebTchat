import React, { useCallback, useEffect, useState } from 'react';
import Messages from './Messages';
import MessageSend from './MessageSend';
import { useJsonFetchOrFlash } from './functions/hooks'

export default function Channel ({channel}) {

  const [user, setUser] = useState({})

  const { loading, done, fetch } = useJsonFetchOrFlash()
  const [messages, setMessages] = useState([])
  useEffect(async () => {
    if(channel.id != ''){
      setMessages(await fetch('channels/' + channel.id + '/messages'))
    }
  }, [channel])

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

  const handleAddMessage = async (newMessage) => {
    newMessage.username = localUser.name
    newMessage.gravatarId = localUser.gravatarId
    setMessages([...messages, newMessage])
  }

  return (
    <>
      {!done ? 'Chargement...' : 
        <div className="stack" >
          <h1 className="h3 center py1">{channel.name}</h1>
          <Messages localUser={user} messages={messages}></Messages>
          <div>
            <MessageSend channel={channel} addMessage={handleAddMessage}/>
          </div>
        </div>
      }
    </>
  )
}