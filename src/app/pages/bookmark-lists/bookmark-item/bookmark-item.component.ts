import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';

@Component({
  selector: 'bm-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
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

  onFav(e: Event, bookmark: Bookmark) {
    e.preventDefault();
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
