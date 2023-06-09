import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { getServerSession } from 'next-auth/next';
import { ERROR, SUCCESS } from '~/types/Status';
import createPost from './createPost';
import savingPost from './savingPost';

export async function POST(request: Request) {
  const session = await getServerSession();
  const formData = await request.formData();

  const content = formData.get('content') as string;
  const image = formData.get('image') as string;

  const postId = formData.get('post-id') as string;

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  if (content?.length == 0) {
    return NextResponse.json({ status: ERROR, message: 'Content is missing' }, { status: 400 });
  }

  switch (true) {
    case postId != undefined:
      return savingPost({ postId, session });
    case content != null:
      return createPost({ content, session });
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  if (searchParams.get('saved')) {
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
  try {
    const posts = await prisma.post.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ status: SUCCESS, data: posts }, { status: 200 });
  } catch (err) {
    console.log('Error on GET Post:\n', err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const formData = await request.formData();
  const session = await getServerSession();

  const likes = formData.get('likes') as string;
  const id = formData.get('id') as string;

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  if (likes) {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        totalLikes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ status: SUCCESS, message: 'Updated likes' }, { status: 200 });
  }
}
