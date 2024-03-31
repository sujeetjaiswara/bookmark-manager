import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BtnFavComponent } from 'src/app/shared/components/btn-fav/btn-fav.component';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';

@Component({
  selector: 'bm-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    BtnFavComponent
  ],
  providers: [
    { provide: IMAGE_CONFIG, useValue: { placeholderResolution: 40 } }
  ]
})
export class BookmarkItemComponent {
  @Input() bookmark!: Bookmark;
  @Output() removeBookmark = new EventEmitter<Bookmark>();
  @Output() toggleFavBookmark = new EventEmitter<Bookmark>();

  constructor(private _router: Router,) { }

  getTags(tags: string) {
    if (!tags) {
      return;
    }

    return tags.split(',');
  }

  onFav(bookmark: Bookmark) {
    this.toggleFavBookmark.emit(bookmark);
  }

  onEdit(e: Event, bookmark: Bookmark) {
    e.preventDefault();
    this._router.navigate(['add-bookmark']);
  }

  onRemove(e: Event, bookmark: Bookmark) {
    e.stopPropagation();
    this.removeBookmark.emit(bookmark);
  }

}
