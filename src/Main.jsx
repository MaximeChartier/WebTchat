import React, { useEffect, useState, useRef} from 'react';
import Channels from './elements/Channels';
import Channel from './elements/Channel';
import { useJsonFetchOrFlash } from './functions/hooks'

export default function Main () {
  const [selectedChannel, setSelectedChannel] = useState({ id: '' });
  const { loading, done, fetch } = useJsonFetchOrFlash('users')
  const [users , setUsers] = useState([])
  const calledOnce = useRef(false);

  useEffect(async() => {
    window.history.replaceState({}, "", selectedChannel.name);
  }, [selectedChannel])

  useEffect(async () => {
    if(calledOnce.current){
      return
    }
    calledOnce.current = true
    setUsers(await fetch())
  }, [users])
  return (
    <div className="flex">
      <div className="stack channels">
        <p >Fils de discussion :</p>
        <Channels setSelectedChannel={setSelectedChannel}/>
      </div>
      <div className="channel">
        <Channel users={users} channel={selectedChannel}/>
      </div>
    </div>
  )
}