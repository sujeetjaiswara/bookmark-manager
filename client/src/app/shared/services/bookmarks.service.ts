import { Injectable, WritableSignal, signal } from '@angular/core';
import { Bookmark } from '../types/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  public bookmarks$: WritableSignal<Bookmark[]> = signal([]);
  public favBookmarks$: WritableSignal<Bookmark[]> = signal([]);
  public count: WritableSignal<number> = signal(0);

  getBookmarks() {
    return this.bookmarks$.asReadonly();
  }

  setBookmarks(value: Bookmark[]) {
    this.bookmarks$.set(value);
  }

  getFavBookmarks() {
    return this.favBookmarks$.asReadonly();
  }

  setFavBookmarks(values: Bookmark[]) {
    this.favBookmarks$.set(values);
  }

  getCount() {
    return this.count();
  }

  setCount(value: number) {
    this.count.set(value);
  }
}
