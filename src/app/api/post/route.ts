import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { getServerSession } from 'next-auth/next';
import { ERROR, SUCCESS } from '~/types/Status';

// Post a card
export async function POST(request: Request) {
  const session = await getServerSession();
  const formData = await request.formData();

  const content = formData.get('content') as string;
  const image = formData.get('image') as File;

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  if (content?.length == 0) {
    return NextResponse.json({ status: ERROR, message: 'Content is missing' }, { status: 400 });
  }

  let uploadedImage = null;

  if (image) {
    // Upload image to cloudinary
    const fd = new FormData();
    fd.append('file', image);
    fd.append('upload_preset', 'ui2iyrk6');
    console.log('upload to cloudinary');

    const res = await fetch('https://api.cloudinary.com/v1_1/dxlzmyqwi/image/upload', { method: 'POST', body: fd });
    const result = await res.json();

    uploadedImage = result.secure_url;
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        image: uploadedImage,
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

// Get all card
export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
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
        savedPost: {
          where: {
            user: {
              email: {
                equals: session.user.email,
              },
            },
          },
        },
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
