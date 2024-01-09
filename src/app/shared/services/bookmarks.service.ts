import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bookmark } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  public bookmarks$: BehaviorSubject<Bookmark[]>;
  public favBookmarks$: BehaviorSubject<Bookmark[]>;

  constructor() {
    this.bookmarks$ = new BehaviorSubject<Bookmark[]>([]);
    this.favBookmarks$ = new BehaviorSubject<Bookmark[]>([]);
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.bookmarks$.asObservable();
  }

  setBookmarks(values: Bookmark[]) {
    this.bookmarks$.next(values)
  }

  getFavBookmarks() {
    return this.favBookmarks$.asObservable();
  }

  setFavBookmarks(values: Bookmark[]) {
    this.favBookmarks$.next(values);
  }
}
