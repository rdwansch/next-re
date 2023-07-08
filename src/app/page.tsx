'use client';

import { useSession } from 'next-auth/react';
import LandingPage from '~/components/LandingPage';
import Nav from '~/components/Nav';
import PostCard from '~/components/PostCard';
import SideNav from '../components/SideNav';
import NewPost from '~/components/NewPost';
import { useEffect, useState } from 'react';
import { Post } from '~/types/Post';
import { Response } from '~/types/Response';
import useSWR, { Fetcher } from 'swr';
import fetcher from '~/lib/Fetcher';

export default function Home() {
  const session = useSession();
  const { data: result, isLoading } = useSWR<{ data: Post[] }>('/api/post', fetcher);

  if (session.status == 'unauthenticated') {
    return <LandingPage />;
  }

  if (session.status == 'authenticated')
    return (
      <>
        <Nav />

        <div className="flex flex-col md:flex-row justify-evenly">
          <SideNav />
          <div>
            <NewPost />

            {!isLoading && result!.data.map(post => <PostCard key={post.id} data={post} />)}
          </div>

          <div className="hidden lg:block">
            <div className="px-5">
              <div className="bg-white border mx-auto mt-5 p-5 rounded max-w-xs">
                Ads Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, fugiat blanditiis eveniet quae
                sapiente impedit, earum vero, optio amet aperiam nihil nulla? Recusandae asperiores laborum sunt, eum
                adipisci velit sint.
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
