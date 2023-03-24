export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;
  email: string;
  avatarS3Key: string | null;
  coverPicS3Key: string | null;
  config: any;
  blockedUsers: Array<{
    firstname: string;
    lastname: string;
    email: string;
  }>;
  blockedByUsers: Array<{ id: number }>;
}
