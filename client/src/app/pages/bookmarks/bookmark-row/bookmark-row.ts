import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from '@shared/types';

@Component({
  selector: 'bm-bookmark-row',
  imports: [CommonModule, NgOptimizedImage],
  providers: [{ provide: IMAGE_CONFIG, useValue: { placeholderResolution: 40 } }],
  templateUrl: './bookmark-row.html',
  styleUrl: './bookmark-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkRow {
  #router = inject(Router);
  bookmark = input.required<Bookmark>();
  removeBookmark = output<Bookmark>();
  toggleFavBookmark = output<Bookmark>();

  onFav(bookmark: Bookmark) {
    this.toggleFavBookmark.emit(bookmark);
  }

  onEdit(e: Event, bookmark: Bookmark) {
    e.preventDefault();
    this.#router.navigate(['edit-bookmark', bookmark._id]);
  }

  onRemove(e: Event, bookmark: Bookmark) {
    e.stopPropagation();
    this.removeBookmark.emit(bookmark);
  }
}
