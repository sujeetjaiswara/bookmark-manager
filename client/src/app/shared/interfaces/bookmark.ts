export interface Bookmark {
  _id?: string;
  title: string;
  link: string;
  tags: string;
  description: string;
  screenshot: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Likes: boolean;
}
