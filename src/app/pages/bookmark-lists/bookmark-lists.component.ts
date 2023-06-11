import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { DataService } from 'src/app/shared/services/data.service';
import data from './../../../assets/data/bookmarks.json';
import { BookmarkItemComponent } from './bookmark-item/bookmark-item.component';

@Component({
  selector: 'bm-bookmark-lists',
  templateUrl: './bookmark-lists.component.html',
  styleUrls: ['./bookmark-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    BookmarkItemComponent,
    CommonModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [DataService]
})
export class BookmarkListsComponent implements OnInit {
  bookmarks: Bookmark[] = []

  constructor(
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _data: DataService
  ) { }

  ngOnInit(): void {
    // this._data.getBookmarks().subscribe((data) => {
    //   console.log('bookmarks=>', data)
    // });

    console.log(data);

    this.bookmarks = data;
    this._cd.markForCheck();
  }

  trackByFn(_index: number, bookmark: Bookmark) {
    return bookmark.BookmarkId;
  }

  onAdd(e: Event) {
    e.preventDefault();
    this._router.navigate(['add-bookmark']);
  }

  removeBookmark(bookmark: Bookmark) {
    const cnf = confirm('Are you sure?');
    if (cnf) {
      const bookmarks = [...this.bookmarks];
      const index = bookmarks.findIndex(x => x.BookmarkId === bookmark.BookmarkId);
      if (index > -1) {
        bookmarks.splice(index, 1);
        this.bookmarks = bookmarks;
      }
    }
  }
}
