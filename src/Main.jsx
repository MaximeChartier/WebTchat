import React, {useEffect, useState} from 'react';
import Channels from './Channels';
import Channel from './Channel';

export default function Main () {
  const [selectedChannel, setSelectedChannel] = useState({
    id: ''
  });
  const [author, setAuthor] = useState('max');
  const [channels, setChannels] = useState([
    {
        name: 'Fake channel',
        messages: [{
            author: 'sergei',
            creation: 1602831101929,
            content: `
        ## 1 - Architecture - Level easy
        
        It is now the right time to re-organize/refactor our code. Split this
        monolithic react Component into multiple section. In the end, we should end
        up with the following components: 'Header', 'Footer', 'Main', 'Channels',
        'Channel', 'Messages', 'MessageSend':
       
        `
        }, {
            author: 'david',
            creation: 1602832138892,
            content: `
        ## 2 - Styles - Level easy
        
        Give it some styles, use CSS to make it looks good. Possible source of
        improvements include changing the colors, replacing the HTML 'send' button
        with an icon, working on the header, providing day/night themes ... be creative
        `
        }, {
            author: 'sergei',
            creation: 1602840139202,
            content: `
        ## 3 - Use an external library - Level medium
        
        Format the date in a human readable format. While the date is generated on
        the server side to ensure its relevance and prevent from forgery, it must be
        displayed according to the user browser local. 
        `
        }]
    },
    {
      name: 'test channel',
      messages: [{
          author: 'sergei',
          creation: 1602831101929,
          content: `
     TEST
      `
      }]
  }
  ]);

  const [channelsList, setChannelsList] = useState([])

  const addMessage = ({
    content
  }) => {
    const tmp = [...channels];
    tmp[selectedChannel].messages.push({
      author: author,
      creation: Date.now(),
      content: content
    });
    setChannels(tmp);
  }

  return (
    <div className="flex">
      <div className="stack channels">
        <p >Fils de discussion :</p>
        <Channels setSelectedChannel={setSelectedChannel}/>
      </div>
      <div className="channel">
        <Channel addMessage={addMessage} channel={selectedChannel}/>
      </div>
    </div>
  )
}