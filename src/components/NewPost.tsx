'use client';

import Image from 'next/image';
import { FormEvent, useRef, useState } from 'react';
import { Response } from '~/types/Response';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';

export default function NewPost() {
  const session = useSession();
  const { mutate } = useSWRConfig();

  const [imageBlob, setImageBlob] = useState<string>();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const contentPostRef = useRef<HTMLSpanElement>(null);

  const handleImageChange = () => {
    if (inputImageRef.current?.files && inputImageRef.current?.files[0]) {
      const url = URL.createObjectURL(inputImageRef.current?.files[0]);
      setImageBlob(url);
    }
  };

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (inputImageRef.current?.files && inputImageRef.current?.files[0]) {
      formData.append('image', inputImageRef.current.files[0]);
    }
    formData.append('content', contentPostRef.current?.innerHTML + '');

    const res = await fetch('/api/post', { method: 'POST', body: formData });
    const data: Response = await res.json();

    if (data.status == 'SUCCESS') {
      clearInput();
      mutate('/api/post');
    }
  };

  const clearInput = () => {
    contentPostRef.current!.innerHTML = '';
    inputImageRef.current!.value = '';
    setImageBlob('');
  };

  return (
    <div className="px-5">
      <div className="bg-white max-w-full w-[36rem] mx-auto mt-5 p-5 rounded">
        <div>
          {session.status == 'authenticated' && (
            <Image src={session?.data?.user?.image + ''} className="rounded-full" alt="Profile" width={50} height={50} />
          )}
        </div>

        <form onSubmit={handlePostSubmit}>
          <span
            ref={contentPostRef}
            contentEditable
            className="mt-5 cursor-text block w-full outline-none overflow-hidden empty:before:content-['Write...'] empty:before:text-gray-500"
          ></span>

          {imageBlob && <Image src={imageBlob} className="shadow-lg border" alt="img" width={200} height={0} />}
          <div className="mt-5 flex gap-5 items-center">
            <input type="file" id="input-image" ref={inputImageRef} hidden onChange={handleImageChange} />
            <button>
              <label htmlFor="input-image" className="flex items-center text-gray-500 gap-1">
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
              </label>
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
        </form>
      </div>
    </div>
  );
}
