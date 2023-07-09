import { getServerSession } from 'next-auth';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import { prisma } from 'prisma/config';
import { ERROR, SUCCESS } from '~/types/Status';

export async function DELETE(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ status: ERROR, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: {
        email: session.user.email + '',
      },
    });

    return NextResponse.json({ status: SUCCESS, data: '' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: ERROR, message: 'Internal Server Error' }, { status: 500 });
  }
}
