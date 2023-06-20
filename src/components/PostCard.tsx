'use client';

import Image from 'next/image';

export default function PostCard() {
  return (
    <div className="px-5">
      <div className="bg-white max-w-xl mx-auto mt-5 p-5 rounded">
        <div className="flex items-center gap-3">
          <Image src="/avatar.png" alt="Profile" width={50} height={50} />
          <div>
            <h3>Margareth Lianne</h3>
            <p className="text-sm text-gray-500">Social Enthusiast</p>
          </div>
        </div>

        <div className="mt-5 text-gray-600">
          <p>Here is What I says</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto veritatis fuga minima dolores sunt, vitae
            debitis porro nostrum ipsam autem cum, saepe dolorem eligendi earum
          </p>
          <br />
          <p>
            Odio repellendus dolore libero natus non. Ratione, exercitationem tenetur deserunt hic voluptas aliquam ipsa
            incidunt repudiandae voluptatum nobis eveniet bland itiis, architecto voluptates at alias molestiae facere,
            cupiditate ipsum perspiciatis quidem id.
          </p>
        </div>

        <div className="text-gray-500 mt-5 flex gap-5">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
            <span className="text-xs">5</span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-chat-right"
            viewBox="0 0 16 16"
          >
            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
