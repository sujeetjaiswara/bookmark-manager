import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Bookmarks as BookmarksService, Data } from '@core/services';
import { GlobalSearchComponent } from '@shared/components';
import { Bookmark, BookmarksResponse } from '@shared/types';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { BookmarkForm } from './bookmark-form/bookmark-form';
import { BookmarkRow } from './bookmark-row/bookmark-row';

@Component({
  selector: 'bm-bookmarks',
  imports: [BookmarkRow, GlobalSearchComponent, ScrollingModule, ButtonModule],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Bookmarks implements OnInit {
  #destroyRef = inject(DestroyRef);
  #dataService = inject(Data);
  #dialogService = inject(DialogService);
  bookmarksService = inject(BookmarksService);
  isLoading = signal(false);
  selectedBookmark: Bookmark | null = null;

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks() {
    this.isLoading.set(true);
    this.#dataService
      .getBookmarks()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: (rs: BookmarksResponse) => {
          if (rs.data) {
            this.bookmarksService.setBookmarks(rs.data.reverse());
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

  onRemoveBookmark(bookmark: Bookmark) {
    this.selectedBookmark = bookmark;
    // this.modal.show();
  }

  onCancelModal() {
    this.selectedBookmark = null;
    // this.modal.hide();
  }

  onYesModal(selectedBookmark: Bookmark | null) {
    this.removeBookmark(selectedBookmark);
  }

  removeBookmark(bookmark: Bookmark | null) {
    this.#dataService
      .deleteBookmark(bookmark?._id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          const bookmarks = [...this.bookmarksService.bookmarks$()];
          const index = bookmarks.findIndex(x => x._id === bookmark?._id);
          if (index > -1) {
            bookmarks.splice(index, 1);
            this.bookmarksService.setBookmarks(bookmarks);
          }

          this.selectedBookmark = null;
          // this.modal.hide();
        },
        error: err => {
          console.log(err);
        },
      });
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

  onAdd() {
    const ref: DynamicDialogRef = this.#dialogService.open(BookmarkForm, {
      header: 'Add New Bookmark',
      style: { width: '90vw', maxWidth: '50rem' },
      contentStyle: { overflow: 'hidden' },
      modal: true,
      closable: true,
      data: {},
    });

    ref.onClose.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((result: boolean) => {
      if (result) {
        this.getBookmarks();
      }
    });
  }
}
