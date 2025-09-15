import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkRow } from './bookmark-row';

describe('BookmarkRow', () => {
  let component: BookmarkRow;
  let fixture: ComponentFixture<BookmarkRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
