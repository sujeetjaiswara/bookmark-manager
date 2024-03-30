import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchBoxComponent } from 'src/app/shared/components/search-box/search-box.component';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';
import { DataService } from 'src/app/shared/services/data.service';
import { BookmarkItemComponent } from '../bookmark-lists/bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-favourites',
  templateUrl: './bookmark-favourites.component.html',
  styleUrls: ['./bookmark-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    BookmarkItemComponent,
    CommonModule,
    HttpClientModule,
    ScrollingModule,
    SearchBoxComponent
  ],
  providers: [DataService]
})
export class BookmarkFavouritesComponent {
  public bookmarks$: Observable<Bookmark[]>;

  constructor(
    private _router: Router,
    // private _cd: ChangeDetectorRef,
    // private _data: DataService,
    private _bookmarksService: BookmarksService
  ) {
    this.bookmarks$ = this._bookmarksService.getFavBookmarks();
    this.getFavBookmarks();
  }

  getFavBookmarks() {
    const allBookmarks = this._bookmarksService.bookmarks$.getValue();
    const favBookmarks = allBookmarks.filter(bookmark => bookmark.Likes);
    this._bookmarksService.setFavBookmarks(favBookmarks);
  }

  trackByFn(_index: number, bookmark: Bookmark) {
    return bookmark.BookmarkId;
  }

  onAdd(e: Event) {
    e.preventDefault();
    this._router.navigate(['add-bookmark']);
  }

  removeBookmark(bookmark: Bookmark) {
    const cnf = confirm('Are you sure?');
    if (cnf) {
      const bookmarks = [...this._bookmarksService.bookmarks$.getValue()];
      const index = bookmarks.findIndex(x => x.BookmarkId === bookmark.BookmarkId);
      if (index > -1) {
        bookmarks.splice(index, 1);
        this._bookmarksService.setBookmarks(bookmarks);
      }
    }
  }

  toggleFavBookmark(bookmark: any) {
    const bookmarks = [...this._bookmarksService.bookmarks$.getValue()];
    const index = bookmarks.findIndex(x => x.BookmarkId === bookmark.BookmarkId);
    if (index > -1) {
      bookmarks[index].Likes = !bookmarks[index].Likes;
      this._bookmarksService.setBookmarks(bookmarks);
    }
  }

}
