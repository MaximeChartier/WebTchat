import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import Messages from './Messages';
import MessageSend from './MessageSend';
import { useJsonFetchOrFlash } from '../functions/hooks';
import { FetchForm, FormPrimaryButton } from '../components/Form.jsx';

export default function Channel({ users, channel }) {
  const [user, setUser] = useState({});

  const { loading, done, fetch } = useJsonFetchOrFlash();
  const [messages, setMessages] = useState([]);
  useEffect(async () => {
    if (channel.id != '') {
      setMessages(await fetch(`channels/${channel.id}/messages`));
    }
  }, [channel]);

  const [localUser, setLocalUser] = useState({});
  const [localUserLodded, setLocalUserLodded] = useState(false);

  useEffect(async () => {
    const u = localStorage.getItem('user');
    if (u) {
      const t = JSON.parse(u);
      if (t.name) {
        setLocalUser(t);
        setLocalUserLodded(true);
      }
    }
  }, [localUserLodded]);

  const handleAddMessage = async (newMessage) => {
    newMessage.username = localUser.name;
    newMessage.gravatarId = localUser.gravatarId;
    setMessages([...messages, newMessage]);
  };

  return (
    <>
      {!done
        ? (
          <div className="m2">
            Choisissez un fil de discussion
          </div>
        )
        : (
          <div className="stack">
            <div className="flex">
              <h1 className="ml3 h3 center py1">{channel.name}</h1>
              <div>
                URL du fil :
                <a className="bold">
                  {window.location.origin}
                  /
                  {channel.name}
                </a>
              </div>
            </div>
            <div className="mx4">
              <div className="py1">
                Liste des membres
              </div>
              <FetchForm action={`channels/${channel.id}`} method="PUT" className="flex">
                <div className="w100 mr2">
                  <Select
                    key={channel.id}
                    name="members"
                    defaultValue={channel.members.map((m) => ({ value: m.id, label: m.name }))}
                    options={users.map((m) => ({ value: m.id, label: m.name }))}
                    isMulti
                  />
                </div>
                <div>
                  <FormPrimaryButton>Enregister</FormPrimaryButton>
                </div>
              </FetchForm>
            </div>
            <Messages localUser={user} messages={messages} />
            <div>
              <MessageSend channel={channel} addMessage={handleAddMessage} />
            </div>
          </div>
        )}
    </>
  );
}
