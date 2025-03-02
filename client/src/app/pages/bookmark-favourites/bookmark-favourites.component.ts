import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Bookmark } from 'src/app/shared/types/bookmark';
import { BookmarkItemComponent } from '../bookmark-lists/bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-favourites',
  templateUrl: './bookmark-favourites.component.html',
  styleUrls: ['./bookmark-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookmarkItemComponent, CommonModule, ScrollingModule],
  providers: [DataService],
})
export class BookmarkFavouritesComponent {
  // public bookmarks$: Observable<Bookmark[]>;
  #router = inject(Router);
  _bookmarksService = inject(BookmarksService);

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
