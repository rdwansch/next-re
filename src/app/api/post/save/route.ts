import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { ERROR, SUCCESS } from '~/types/Status';

export async function POST(request: Request) {
  const session = await getServerSession();
  const formData = await request.formData();

  const postId = formData.get('post-id') as string;

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // check if users has saved
    const isSaved = await prisma.savedPost.findFirst({
      where: {
        email: session.user?.email + '',
        AND: {
          postId,
        },
      },
    });

    //if never saved create new
    if (!isSaved) {
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
    } else {
      // Unsaved
      await prisma.savedPost.delete({
        where: {
          id: isSaved.id,
        },
      });
    }

    return NextResponse.json({ status: SUCCESS, data: '' }, { status: 200 });
  } catch (err) {
    console.log('Error on Saved Post:\n', err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await prisma.savedPost.findMany({
      where: {
        email: session?.user.email + '',
      },
      select: {
        postId: true,
        post: {
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
            savedPost: true,
          },
        },
      },
    });

    return NextResponse.json({ status: SUCCESS, data: posts }, { status: 200 });
  } catch (err) {
    console.log('Error on GET SavedPost:\n', err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}
