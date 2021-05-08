import React, { useEffect, useState, useRef } from 'react';
import { PrimaryButton } from '../components/Button.jsx'
import { useJsonFetchOrFlash } from '../functions/hooks'
import AddChannel from './AddChannel';

export default function Channels ({ setSelectedChannel }) {

  const { loading, done, fetch } = useJsonFetchOrFlash('channels')
  const [ channels, setChannels ] = useState([])
  const calledOnce = useRef(false);

  useEffect(async () => {
    setChannels(await fetch())
  }, [done])

  useEffect(async () => {
    if(calledOnce.current){
      return
    }
    if (channels.length <= 0){
      return
    }
    calledOnce.current = true
    channels.map(c => {
      if(window.location.pathname.split('/')[1] == c.name){    
        setSelectedChannel(c)
        window.history.replaceState({}, "", "/");
      }
    })
  }, [channels])

  const handleAddChannel = async (newChannel) => {
    setChannels([...channels, newChannel])
  }

  return (
    <>
      <div>
        {!done ? 'Chargement...' : channels.map((c, i)=> 
          <div className="mb1" key={i}>
            <PrimaryButton size="small" className="btn btn-primary btn-small w100" onClick={() => setSelectedChannel(c)} >
              {c.name}
            </PrimaryButton>
          </div>
          )}
      </div>
      <AddChannel handleSuccess={handleAddChannel}/>
    </>
  );
}