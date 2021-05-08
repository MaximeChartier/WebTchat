import React, { useState} from 'react';
import Channels from './Channels';
import Channel from './Channel';

export default function Main () {
  const [selectedChannel, setSelectedChannel] = useState({
    id: ''
  });

  return (
    <div className="flex">
      <div className="stack channels">
        <p >Fils de discussion :</p>
        <Channels setSelectedChannel={setSelectedChannel}/>
      </div>
      <div className="channel">
        <Channel channel={selectedChannel}/>
      </div>
    </div>
  )
}