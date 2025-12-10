export type User = {
  id: string;
  name: string;
  createdAt: Date;
};

export type UserProfileProps = {
  user: User;
};