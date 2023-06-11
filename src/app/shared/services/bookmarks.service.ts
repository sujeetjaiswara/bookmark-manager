import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bookmark } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public bookmarks$: BehaviorSubject<Bookmark[]>;

  constructor() {
    this.bookmarks$ = new BehaviorSubject<Bookmark[]>([])
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.bookmarks$;
  }

  setBookmarks(values: Bookmark[]) {
    this.bookmarks$.next(values)
  }
}
