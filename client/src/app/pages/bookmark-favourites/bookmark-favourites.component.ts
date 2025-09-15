import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmarks } from '@core/services';
import { Bookmark } from '@shared/types';
import { BookmarkItemComponent } from '../bookmark-lists/bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-favourites',
  templateUrl: './bookmark-favourites.component.html',
  styleUrls: ['./bookmark-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookmarkItemComponent, ScrollingModule],
})
export default class BookmarkFavouritesComponent {
  // public bookmarks$: Observable<Bookmark[]>;
  #router = inject(Router);
  _bookmarksService = inject(Bookmarks);

  constructor() {
    // this.bookmarks$ = this._bookmarksService.getFavBookmarks();
    this.getFavBookmarks();
  }

  getFavBookmarks() {
    // const allBookmarks = this._bookmarksService.bookmarks$();
    // const favBookmarks = allBookmarks.filter(bookmark => bookmark.Likes);
    // this._bookmarksService.setFavBookmarks(favBookmarks);
  }

  trackByFn(_index: number, bookmark: Bookmark) {
    return bookmark._id;
  }

  onAdd(e: Event) {
    e.preventDefault();
    this.#router.navigate(['add-bookmark']);
  }

  removeBookmark(bookmark: Bookmark) {
    const cnf = confirm('Are you sure?');
    if (cnf) {
      const bookmarks = [...this._bookmarksService.bookmarks$()];
      const index = bookmarks.findIndex(x => x._id === bookmark._id);
      if (index > -1) {
        bookmarks.splice(index, 1);
        this._bookmarksService.setBookmarks(bookmarks);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleFavBookmark(bookmark: Bookmark) {
    // const bookmarks = [...this._bookmarksService.bookmarks$()];
    // const index = bookmarks.findIndex(x => x.BookmarkId === bookmark.BookmarkId);
    // if (index > -1) {
    //   bookmarks[index].Likes = !bookmarks[index].Likes;
    //   this._bookmarksService.setBookmarks(bookmarks);
    // }
  }
}
