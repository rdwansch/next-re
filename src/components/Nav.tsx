'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Nav() {
  const session = useSession();

  return (
    <div className="relative w-screen h-[69px]">
      <div className="py-5 bg-white border-b border-slate-300 absolute h-fit w-full">
        <div className="container mx-auto flex items-center justify-between px-5">
          <h1 className="font-bold text-xl">Next-Re</h1>
          <div>
            {session.status == 'unauthenticated' && (
              <Link
                href={'/api/auth/signin'}
                className="transition py-2 px-5 rounded text-white bg-slate-900 hover:text-black hover:bg-transparent border-slate-900 border"
              >
                Signin
              </Link>
            )}

            {/* {session.status == 'authenticated' && (
              <div className="md:flex items-center justify-between gap-2 border bg-slate-50 border-fuchsia-500 rounded px-2 py-0.5 w-[300px] hidden">
                <input
                  type="text"
                  className="outline-none border-none rounded w-full bg-slate-50"
                  placeholder="search inspiration"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="stroke-fuchsia-600"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
