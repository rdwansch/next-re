import { Post } from './Post';

export type Response =
  | ({} & {
      status: 'SUCCESS';
      data: Post[];
    })
  | {
      status: 'ERROR';
      message: string;
    };
