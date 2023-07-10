import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { ERROR, SUCCESS } from '~/types/Status';

type Params = {
  content: string;
  session: Session;
};

export default async function createPost({ content, session }: Params) {
  try {
    const post = await prisma.post.create({
      data: {
        content,
        user: {
          connect: {
            email: session?.user?.email + '',
          },
        },
      },

      select: {
        content: true,
        image: true,
        totalLikes: true,
        id: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ status: SUCCESS, data: [post] });
  } catch (err) {
    console.log('Error on create Post:\n', err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}
