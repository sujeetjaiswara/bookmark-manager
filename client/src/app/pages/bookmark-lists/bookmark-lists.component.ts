import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { InstanceOptions, ModalInterface, ModalOptions } from 'flowbite';
import { Modal } from 'flowbite';
import { finalize } from 'rxjs';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Bookmark, BookmarksResponse } from 'src/app/shared/types/bookmark';
import { BookmarkItemComponent } from './bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-lists',
  templateUrl: './bookmark-lists.component.html',
  styleUrls: ['./bookmark-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookmarkItemComponent, CommonModule, ScrollingModule],
})
export class BookmarkListsComponent implements OnInit, AfterViewInit {
  #destroyRef = inject(DestroyRef);
  #dataService = inject(DataService);
  bookmarksService = inject(BookmarksService);
  isLoading = signal(false);
  modal!: ModalInterface;
  selectedBookmark: Bookmark | null = null;

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.initConfirmModal();
  }

  initConfirmModal() {
    const $modalElement: HTMLElement | null = document.querySelector('#popup-modal');

    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      },
    };

    const instanceOptions: InstanceOptions = {
      id: 'popup-modal',
      override: true,
    };

    this.modal = new Modal($modalElement, modalOptions, instanceOptions);
  }

  trackByFn(_index: number, bookmark: Bookmark) {
    return bookmark._id;
  }

  onRemoveBookmark(bookmark: Bookmark) {
    this.selectedBookmark = bookmark;
    this.modal.show();
  }

  onCancelModal() {
    this.selectedBookmark = null;
    this.modal.hide();
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
          this.modal.hide();
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
}
