type User = {
  name: string;
  image: string;
  username: string;
};

export type Post = {
  content: string;
  image: string | null;
  totalLikes: number;
  id: number;
  createdAt: Date;
  user: User;
  savedPost: User[];
};
