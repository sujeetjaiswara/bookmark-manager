import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bookmark } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  public bookmarks$: WritableSignal<Bookmark[]> = signal([]);
  public favBookmarks$: BehaviorSubject<Bookmark[]>;
  public count: WritableSignal<number> = signal(0);

  constructor() {
    this.favBookmarks$ = new BehaviorSubject<Bookmark[]>([]);
  }

  getBookmarks() {
    return this.bookmarks$();
  }

  setBookmarks(value: Bookmark[]) {
    this.bookmarks$.set(value);
  }

  getFavBookmarks() {
    return this.favBookmarks$.asObservable();
  }

  setFavBookmarks(values: Bookmark[]) {
    this.favBookmarks$.next(values);
  }

  getCount() {
    return this.count();
  }

  setCount(value: number) {
    this.count.set(value);
  }
}
