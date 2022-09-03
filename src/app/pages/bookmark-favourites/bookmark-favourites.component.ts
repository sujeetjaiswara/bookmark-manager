import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bm-bookmark-favourites',
  templateUrl: './bookmark-favourites.component.html',
  styleUrls: ['./bookmark-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFavouritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
