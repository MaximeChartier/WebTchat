import React from 'react';
import Messages from './Messages';
import MessageSend from './MessageSend';

export default function Channel ({ addMessage, channel }) {
  return (
    <>
      <div>
        <div>
          <h1>Messages for {channel.name}</h1>
          <ul>
              <Messages messages={channel.messages}></Messages>
          </ul>
          <MessageSend addMessage={addMessage}/>
        </div>
      </div>
    </>
  )
  }