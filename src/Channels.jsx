import React from 'react';

export default function Channels ({ channels, setSelectedChannel }) {
  return (
    <div className="channels">
      {channels.map((c, i)=> 
        <button key={i} onClick={() => setSelectedChannel(i)} >
          {c.name}
        </button>)}
    </div>
  );
}