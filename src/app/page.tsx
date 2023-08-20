'use client';

import { useSession } from 'next-auth/react';
import LandingPage from '~/components/LandingPage';
import HomePage from '~/components/HomePage';
import Spinner from '~/components/Spinner';

export default function Home() {
  const session = useSession();

  if (session.status == 'loading') {
    return <Spinner />;
  }

  if (session.status == 'unauthenticated') {
    return <LandingPage />;
  }

  if (session.status == 'authenticated') {
    return <HomePage />;
  }
}
