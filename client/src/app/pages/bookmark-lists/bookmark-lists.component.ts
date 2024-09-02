import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBoxComponent } from 'src/app/shared/components/search-box/search-box.component';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';
import { DataService } from 'src/app/shared/services/data.service';
import bookmarkData from './../../../assets/data/bookmarks.json';
import { BookmarkItemComponent } from './bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-lists',
  templateUrl: './bookmark-lists.component.html',
  styleUrls: ['./bookmark-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BookmarkItemComponent, CommonModule, ScrollingModule, SearchBoxComponent],
  providers: [DataService],
})
export class BookmarkListsComponent implements OnInit {
  #router = inject(Router);
  bookmarksService = inject(BookmarksService);

  // Mockup data
  _bookmarkData: any = bookmarkData;

  ngOnInit(): void {
    // Set mockup data
    this.bookmarksService.setBookmarks(this._bookmarkData);
  }

  trackByFn(_index: number, bookmark: Bookmark) {
    return bookmark.BookmarkId;
  }

  onAdd(e: Event) {
    e.preventDefault();
    this.#router.navigate(['add-bookmark']);
  }

  removeBookmark(bookmark: Bookmark) {
    const cnf = confirm('Are you sure?');
    if (cnf) {
      const bookmarks = [...this.bookmarksService.bookmarks$()];
      const index = bookmarks.findIndex(x => x.BookmarkId === bookmark.BookmarkId);
      if (index > -1) {
        bookmarks.splice(index, 1);
        this.bookmarksService.setBookmarks(bookmarks);
      }
    }
  }

  toggleFavBookmark(bookmark: any) {
    const bookmarks = [...this.bookmarksService.bookmarks$()];
    const index = bookmarks.findIndex(x => x.BookmarkId === bookmark.BookmarkId);
    if (index > -1) {
      bookmarks[index].Likes = !bookmarks[index].Likes;
      this.bookmarksService.setBookmarks(bookmarks);
    }
  }
}
