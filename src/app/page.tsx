'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import LandingPage from '~/components/LandingPage';
import Nav from '~/components/Nav';
import PostCard from '~/components/PostCard';
import SideNav from './components/SideNav';

export default function Home() {
  const session = useSession();

  if (session.status == 'unauthenticated') {
    return <LandingPage />;
  }

  return (
    <>
      <Nav />

      <div className="flex flex-col md:flex-row justify-evenly">
        <SideNav />
        <div>
          <NewPostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>

        <div className="hidden lg:block">
          <div className="px-5">
            <div className="bg-white border mx-auto mt-5 p-5 rounded max-w-xs">
              Ads Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, fugiat blanditiis eveniet quae
              sapiente impedit, earum vero, optio amet aperiam nihil nulla? Recusandae asperiores laborum sunt, eum adipisci
              velit sint.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NewPostCard() {
  return (
    <div className="px-5">
      <div className="bg-white max-w-xl mx-auto mt-5 p-5 rounded">
        <div>
          <Image src="/avatar.png" alt="Profile" width={50} height={50} />
        </div>

        <span
          contentEditable
          className="mt-5 cursor-text block w-full outline-none overflow-hidden empty:before:content-['Write...'] empty:before:text-gray-500"
        ></span>
        <div className="mt-5 flex gap-5 items-center">
          <button className="flex items-center text-gray-500 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-card-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
            </svg>
            <span className="text-sm">Image</span>
          </button>

          <button className="flex items-center text-gray-500 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-paperclip"
              viewBox="0 0 16 16"
            >
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
            </svg>
            <span className="text-sm">Attachment</span>
          </button>
        </div>
        <button className="bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring focus:ring-fuchsia-200 text-white px-7 rounded py-0.5 block ml-auto">
          Post
        </button>
      </div>
    </div>
  );
}
