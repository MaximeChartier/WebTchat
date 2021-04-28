import React from 'react';
import Message from './Message';

export default function Messages ({ messages }) {
  return (
    <>
      {messages.map((message, i) => (
          <Message key={i} message={message}/>
      ))}
    </>
  )
}