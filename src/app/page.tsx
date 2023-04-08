'use client';

import { useState } from 'react';

let counter = 0;

export default function Home() {
  const [name, setName] = useState('');

  const submit = e => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" onChange={e => setName(e.target.value)} />
      </form>

      {counter++}
    </>
  );
}
