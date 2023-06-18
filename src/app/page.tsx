'use client';

import { signIn, useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  const handleSignin = async () => {
    const res = await signIn('credentials', { username: 'test', password: 'test' });

    console.log(res);
  };

  return (
    <>
      {JSON.stringify(session)}
      <button onClick={() => handleSignin()} className="text-xl px-10 py-2 bg-blue-600 rounded text-white mx-auto block">
        Sign in
      </button>
    </>
  );
}
