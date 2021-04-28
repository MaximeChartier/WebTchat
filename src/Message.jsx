import React from 'react';
import nl2br from 'react-nl2br';

export default function Message ({ message }) {
  
    return (
      <>
        <li>
          <p>
            <span>{message.author}</span>
            {' '}
            <span>{(new Date(message.creation)).toString()}</span>
          </p>
          <div>
            {nl2br(message.content)}
          </div>
        </li>
      </>
    )
  }