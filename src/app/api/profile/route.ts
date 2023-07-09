import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { ERROR, SUCCESS } from '~/types/Status';

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        name: true,
        image: true,

        username: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ status: SUCCESS, data: user }, { status: 200 });
  } catch (err) {
    console.log('Err on Prisma find user:\n', err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}
