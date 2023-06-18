'use client';

import Link from 'next/link';

export default function Nav() {
  return (
    <div className="relative w-screen h-[69px]">
      <div className="py-5 bg-white border-b border-slate-300 absolute h-fit w-full">
        <div className="container mx-auto flex items-center justify-between px-5">
          <h1 className="font-bold text-xl">Next-Re</h1>
          <div>
            <Link
              href={'/api/auth/signin'}
              className="transition py-2 px-5 rounded text-white bg-slate-900 hover:text-black hover:bg-transparent border-slate-900 border"
            >
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
