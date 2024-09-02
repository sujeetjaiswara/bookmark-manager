import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkListsComponent } from './bookmark-lists.component';

describe('BookmarkListsComponent', () => {
  let component: BookmarkListsComponent;
  let fixture: ComponentFixture<BookmarkListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkListsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
