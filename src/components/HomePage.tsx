import React from 'react';
import useSWR from 'swr';

import Nav from './Nav';
import SideNav from './SideNav';
import NewPost from './NewPost';
import { Post } from '~/types/Post';
import { useSession } from 'next-auth/react';
import fetcher from '~/lib/Fetcher';
import PostCard from './PostCard';

export default function HomePage() {
  const session = useSession();
  const { data: result, isLoading } = useSWR<{ data: Post[] }>(session.status == 'authenticated' && '/api/post', fetcher);

  return (
    <>
      <Nav />

      <div
        // className="flex flex-col md:flex-row justify-evenly"
        className="flex flex-col md:flex-row mx-auto max-w-screen-xl"
      >
        <SideNav />
        <div>
          <NewPost />

          {isLoading && (
            <>
              <div className="px-5">
                <div className="bg-gray-100 animate-pulse max-w-xl mx-auto mt-5 p-5 h-[10rem] rounded"></div>
              </div>
              <div className="px-5">
                <div className="bg-gray-100 animate-pulse max-w-xl mx-auto mt-5 p-5 h-[10rem] rounded"></div>
              </div>
            </>
          )}

          {!isLoading && result!.data.map(post => <PostCard key={post.id} data={post} />)}
        </div>
      </div>
    </>
  );
}
