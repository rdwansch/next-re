'use client';

import Image from 'next/image';
import Nav from '~/components/Nav';
import SideNav from '~/components/SideNav';
import useSWR from 'swr';
import fetcher from '~/lib/Fetcher';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface Data {
  name: string | null;
  image: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
}

export default function Page() {
  const session = useSession();
  const { isLoading, data: result } = useSWR<{ status: string; data: Data }>('/api/profile', fetcher);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (confirm('Delete Permanently')) {
      const res = await fetch('/api/account', { method: 'DELETE' });
      if (res.ok) {
        signOut({ redirect: false });
        router.push('/');
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex mx-auto max-w-screen-xl justify-center">
        <div className="mr-auto flex gap-5">
          <SideNav />

          <div className="w-[700px] p-5 bg-white mt-5 ">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="mt-5">
              <div className="flex gap-5 items-center border border-gray-200 p-4 rounded-lg">
                {!isLoading && (
                  <Image
                    className="rounded-full"
                    src={result?.data.image + ''}
                    alt={result?.data.name + ''}
                    width={60}
                    height={60}
                  />
                )}
                {isLoading && <div className="w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse"></div>}
                <div>
                  {isLoading && <div className="w-[12rem] h-[1rem] bg-gray-200 rounded-lg animate-pulse"></div>}

                  <h2 className="text-black text-xl">{result?.data.name}</h2>
                  <p className="text-gray-500">{result?.data.username || result?.data.email}</p>
                </div>
              </div>

              <div className="mt-5 border border-gray-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-600">Personal Information</h2>

                <table className=" mt-5">
                  <tbody>
                    <tr>
                      <td className="w-[600px] text-gray-500">Name</td>
                      <td className="w-[600px] text-gray-500">Username</td>
                    </tr>

                    <tr>
                      {isLoading && (
                        <>
                          <td className="w-[570px] h-[1.2rem] bg-gray-100"></td>
                          <td className="w-[570px] h-[1.2rem] bg-gray-100"></td>
                        </>
                      )}

                      {!isLoading && (
                        <>
                          <td className="w-[600px]">{result?.data.name}</td>
                          <td className="w-[600px]">{result?.data.username || '-'}</td>
                        </>
                      )}
                    </tr>

                    <tr>
                      <td className="w-[600px] text-gray-500 pt-3">Email Address</td>
                      <td className="w-[600px] text-gray-500 pt-3">Phone</td>
                    </tr>
                    <tr>
                      {isLoading && (
                        <>
                          <td className="w-[570px] h-[1.2rem] bg-gray-100"></td>
                          <td className="w-[570px] h-[1.2rem] bg-gray-100"></td>
                        </>
                      )}

                      {!isLoading && (
                        <>
                          <td className="w-[600px]">{result?.data.email}</td>
                          <td className="w-[600px]">{result?.data.email}</td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                className="text-gray-500 border border-gray-500 rounded-lg px-5 py-1 block mt-5 ml-auto hover:bg-gray-500 hover:text-gray-200 transition"
                onClick={handleDeleteAccount}
              >
                Edit Account
              </button>

              <button
                className="text-red-500 border border-red-500 rounded-lg px-5 py-1 block mt-5 ml-auto hover:bg-red-500 hover:text-red-200 transition"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="name" className="text-slate-500 py-1 px-2">
                        Name
                      </label>
                    </td>

                    <td>
                      <input
                        type="text"
                        id="name"
                        className="outline-none focus:border-b focus:border-b-fuchsia-500 py-1 px-2 text-slate-900"
                        value={result?.data.name || ''}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="username" className="text-slate-500 py-1 px-2">
                        Username
                      </label>
                    </td>

                    <td>
                      <input
                        type="text"
                        id="username"
                        value={result?.data.username || ''}
                        className="outline-none focus:border-b focus:border-b-fuchsia-500 py-1 px-2 text-slate-900"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="email" className="text-slate-500 py-1 px-2">
                        Email
                      </label>
                    </td>

                    <td>
                      <input
                        type="email"
                        id="email"
                        value={result?.data.email || ''}
                        className="outline-none focus:border-b focus:border-b-fuchsia-500 py-1 px-2 text-slate-900"
                      />
                    </td>
                  </tr>
                </tbody>
              </table> */
}
