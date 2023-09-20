'use client';
import { FormEvent, useState } from 'react';
import ToolPage from '../tool-page';
import api from '@/app/_utils/api';
import { AxiosError } from 'axios';

const messages = [
  {
    id: 1,
    role: 'user' as const,
    content: 'Hey how do I do something?'
  },
  {
    id: 2,
    role: 'user' as const,
    content: 'Potential bug'
  },
  {
    id: 3,
    role: 'assistant' as const,
    content: 'this is how you do it'
  },
  {
    id: 4,
    role: 'user' as const,
    content: 'Potential bug'
  },
  {
    id: 5,
    role: 'assistant' as const,
    content: 'this is how you do it'
  },
  {
    id: 6,
    role: 'user' as const,
    content: 'Potential bug'
  },
  {
    id: 7,
    role: 'assistant' as const,
    content: 'this is how you do it'
  },
  {
    id: 8,
    role: 'user' as const,
    content: 'Potential bug'
  },
  {
    id: 9,
    role: 'assistant' as const,
    content: 'this is how you do it'
  },
  {
    id: 10,
    role: 'user' as const,
    content: 'Potential bug'
  },
  {
    id: 11,
    role: 'assistant' as const,
    content: 'this is how you do it'
  }
];

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [currMessages, setCurrMessages] = useState(messages);
  const [lastId, setLastId] = useState(
    messages[messages.length - 1].id + 1 || 0
  );

  const submitHandler = (event: FormEvent) => {
    console.log(inputMessage);
    const wrappedMessage = {
      id: lastId,
      role: 'user' as const,
      content: inputMessage
    };
    setLastId(lastId + 1);
    setCurrMessages([...currMessages, wrappedMessage]);
    setInputMessage('');
    api
      .post('/api/chat')
      .then((response) => {
        console.log('res', response);
      })
      .catch((error) => {
        console.error('err', error?.response?.data);
      });
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
