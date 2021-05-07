import React, { useCallback, useEffect, useState } from 'react';
import Messages from './Messages';
import MessageSend from './MessageSend';
import { useJsonFetchOrFlash } from './functions/hooks'

export default function Channel ({channel}) {
  const addMessage = async () => {
    console.log('new message')
  }

  const { loading, done, fetch } = useJsonFetchOrFlash()
  const [messages, setMessages] = useState([])
  useEffect(async () => {
    if(channel.id != ''){
      setMessages(await fetch('channels/' + channel.id + '/messages'))
    }
  }, [channel])

  return (
    <>
      {!done ? 'Chargement...' : 
        <div className="stack" >
          <h1 className="h3 center py1">{channel.name}</h1>
          <div className='stack'>
              <Messages messages={messages}></Messages>
          </div>
          <div>
            <MessageSend channel={channel} addMessage={addMessage}/>
          </div>
        </div>
      }
    </>
  )
}