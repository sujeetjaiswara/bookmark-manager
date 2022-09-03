import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';

@Component({
  selector: 'bm-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkItemComponent implements OnInit {

  @Input() bookmark!: Bookmark;

  constructor() { }

  ngOnInit(): void { }

  getTags(tags: string) {
    if (!tags) {
      return;
    }
    return tags.split(',');
  }

}
