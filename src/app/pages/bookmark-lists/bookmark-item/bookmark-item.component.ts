import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    NgIf,
    NgFor
  ]
})
export class BookmarkItemComponent implements OnInit {
  @Input() bookmark!: Bookmark;
  @Output() removeBookmark = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void { }

  getTags(tags: string) {
    if (!tags) {
      return;
    }
    return tags.split(',');
  }

  onFav(e: Event) {
    e.stopPropagation()
  }

  onRemove(e: Event, bookmark: Bookmark) {
    e.stopPropagation();
    this.removeBookmark.emit(bookmark);
  }

}
