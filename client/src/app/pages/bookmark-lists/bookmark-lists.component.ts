import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';
import { DataService } from 'src/app/shared/services/data.service';
import { BookmarkItemComponent } from './bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-lists',
  templateUrl: './bookmark-lists.component.html',
  styleUrls: ['./bookmark-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BookmarkItemComponent, CommonModule, ScrollingModule],
})
export class BookmarkListsComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  #dataService = inject(DataService);
  bookmarksService = inject(BookmarksService);
  isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.#dataService
      .getBookmarks()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: (data: Bookmark[]) => {
          if (data) {
            this.bookmarksService.setBookmarks(data.reverse());
          }
        },
        error: err => {
          console.error(err);
        },
      });
  }

  trackByFn(_index: number, bookmark: Bookmark) {
    return bookmark._id;
  }

  removeBookmark(bookmark: Bookmark) {
    const cnf = confirm('Are you sure?');
    if (cnf) {
      const bookmarks = [...this.bookmarksService.bookmarks$()];
      const index = bookmarks.findIndex(x => x._id === bookmark._id);
      if (index > -1) {
        bookmarks.splice(index, 1);
        this.bookmarksService.setBookmarks(bookmarks);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleFavBookmark(bookmark: Bookmark) {
    // const bookmarks = [...this.bookmarksService.bookmarks$()];
    // const index = bookmarks.findIndex(x => x._id === bookmark._id);
    // if (index > -1) {
    //   bookmarks[index].Likes = !bookmarks[index].Likes;
    //   this.bookmarksService.setBookmarks(bookmarks);
    // }
  }
}
