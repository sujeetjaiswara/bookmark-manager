import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
