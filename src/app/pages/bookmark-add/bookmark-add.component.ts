import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
