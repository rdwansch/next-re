'use client';

import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <>
      <button onClick={() => signIn('google')} className="text-xl px-10 py-2 bg-blue-600 rounded text-white mx-auto block">
        Sign in
      </button>
    </>
  );
}
