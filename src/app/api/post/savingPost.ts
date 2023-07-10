import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { ERROR, SUCCESS } from '~/types/Status';

export default async function savingPost({ postId, session }: { postId: string; session: Session }) {
  try {
    const isSaved = await prisma.savedPost.findFirst({
      where: {
        email: session.user?.email + '',
        AND: {
          postId,
        },
      },
    });

    if (isSaved) {
      await prisma.savedPost.delete({
        where: {
          id: isSaved.id,
        },
      });
    } else {
      await prisma.savedPost.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              email: session?.user?.email + '',
            },
          },
        },
      });
    }

    return NextResponse.json({ status: SUCCESS, data: '' }, { status: 200 });
  } catch (err) {
    console.log('Error on Saved Post:\n', err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}
