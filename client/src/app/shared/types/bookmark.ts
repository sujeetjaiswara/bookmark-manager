export interface BookmarkCreateUpdateRequest {
  title: string;
  link: string;
  tags: string;
  description: string;
  screenshot: string;
}

export interface BookmarksResponse {
  success: boolean;
  data: Bookmark[];
}

export interface BookmarkResponse {
  success: boolean;
  data: Bookmark;
}

export interface Bookmark {
  _id: string;
  title: string;
  link: string;
  tags: string;
  description: string;
  screenshot: string;
  createdAt: Date;
  updatedAt?: Date;
}
