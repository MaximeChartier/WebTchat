import React, { useEffect, useState } from 'react';
import { PrimaryButton } from './components/Button.jsx'
import { useJsonFetchOrFlash } from './functions/hooks'
import AddChannel from './components/AddChannel';

export default function Channels ({ setSelectedChannel }) {

  const { loading, done, fetch } = useJsonFetchOrFlash('channels')
  const [ channels, setChannels ] = useState([])
  useEffect(async () => {
    setChannels(await fetch())
  }, [done])

  useEffect(async () => {
    if(channels.length > 0){
      setSelectedChannel(channels[0])
    }
  }, [loading])

  const handleAddChannel = async (newChannel) => {
    setChannels([...channels, newChannel])
  }

  return (
    <>
      <div>
        {!done ? 'Chargement...' : channels.map((c, i)=> 
          <div className="mb1" key={i}>
            <PrimaryButton size="small" class="btn btn-primary btn-small w100" onClick={() => setSelectedChannel(c)} >
              {c.name}
            </PrimaryButton>
          </div>
          )}
      </div>
      <AddChannel handleSuccess={handleAddChannel}/>
    </>
  );
}