export type Post = {
  content: string;
  image: string | null;
  totalLikes: number;
  id: number;
  createdAt: Date;
  user: {
    name: string;
    image: string;
    username: string;
  };
};
