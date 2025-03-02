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
  pagination: Pagination;
}

export interface BookmarkResponse {
  success: boolean;
  data: Bookmark;
  pagination: Pagination;
}

export interface Bookmark {
  _id: string;
  title: string;
  link: string;
  tags: string[];
  description: string;
  screenshot: string;
  isFav: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Pagination {
  total: number;
  limit: number;
  skip: number;
}
