import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from '@shared/types';
// import { BtnFavComponent } from 'src/app/shared/components/btn-fav/btn-fav.component';

@Component({
  selector: 'bm-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgOptimizedImage,
    // BtnFavComponent
  ],
  providers: [{ provide: IMAGE_CONFIG, useValue: { placeholderResolution: 40 } }],
})
export class BookmarkItemComponent {
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
