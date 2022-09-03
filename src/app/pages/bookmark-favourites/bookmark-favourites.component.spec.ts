import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkFavouritesComponent } from './bookmark-favourites.component';

describe('BookmarkFavouritesComponent', () => {
  let component: BookmarkFavouritesComponent;
  let fixture: ComponentFixture<BookmarkFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkFavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
