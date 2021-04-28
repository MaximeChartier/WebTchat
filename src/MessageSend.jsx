import React, {useState} from 'react';

export default function  MessageSend ({ addMessage}){
    const [content, setContent] = useState('');

    const onSubmit = (e) => {
        addMessage({content});
        setContent('');
    };

    const onChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <div>
            <textarea
                onChange={onChange}
                name="content"
                rows={5}
                value={content}
            />
            <button onClick={onSubmit} type="submit">Send</button>
        </div>)
};
