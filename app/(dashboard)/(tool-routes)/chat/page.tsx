'use client';
import { FormEvent, useState } from 'react';
import ToolPage from '../tool-page';

const messages = [
  {
    id: 1,
    isUserMessage: true,
    content: 'Hey how do I do something?'
  },
  {
    id: 2,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 3,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  {
    id: 4,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 5,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  {
    id: 6,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 7,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  {
    id: 8,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 9,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  {
    id: 10,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 11,
    isUserMessage: false,
    content: 'this is how you do it'
  }
];

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [currMessages, setCurrMessages] = useState(messages);
  const [lastId, setLastId] = useState(messages[messages.length - 1].id + 1 || 0);

  const submitHandler = (event: FormEvent) => {
    console.log(inputMessage);
    const wrappedMessage = {
      id: lastId,
      isUserMessage: true,
      content: inputMessage
    };
    setLastId(lastId + 1);
    setCurrMessages([...currMessages, wrappedMessage]);
    setInputMessage('');
  };
  return (
    <ToolPage
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      messages={currMessages}
      submitHandler={submitHandler}
    />
  );
}
