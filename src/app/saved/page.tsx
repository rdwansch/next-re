'use client';

import { signOut, useSession } from 'next-auth/react';
import LandingPage from '~/components/LandingPage';
import Nav from '~/components/Nav';
import PostCard from '~/components/PostCard';
import SideNav from '~/components/SideNav';
import NewPost from '~/components/NewPost';
import { Post } from '~/types/Post';
import useSWR, { Fetcher } from 'swr';
import fetcher from '~/lib/Fetcher';

export default function Home() {
  const session = useSession();
  const { data: result, isLoading } = useSWR<{ data: [{ postId: string; post: Post }] }>(
    session.status == 'authenticated' && '/api/post?saved=true',
    fetcher
  );

  if (session.status == 'loading') {
    return <div className="text-center">load</div>;
  }

  if (session.status == 'unauthenticated') {
    return <LandingPage />;
  }

  console.log(result);

  if (session.status == 'authenticated')
    return (
      <>
        <Nav />

        <div
          // className="flex flex-col md:flex-row justify-evenly"
          className="flex flex-col md:flex-row mx-auto max-w-screen-xl"
        >
          <SideNav />
          <div>
            {isLoading && (
              <>
                <div className="px-5">
                  <div className="bg-gray-100 animate-pulse max-w-[576px] mx-auto mt-5 p-5 h-[160px] rounded"></div>
                </div>
                <div className="px-5">
                  <div className="bg-gray-100 animate-pulse max-w-[576px] mx-auto mt-5 p-5 h-[160px] rounded"></div>
                </div>
              </>
            )}

            <h1 className="px-5 pt-5 text-2xl font-semibold text-black">Saved Post</h1>

            {!isLoading && result!.data.map(post => <PostCard key={post.postId} data={post.post} />)}
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
