import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkForm } from './bookmark-form';

describe('BookmarkForm', () => {
  let component: BookmarkForm;
  let fixture: ComponentFixture<BookmarkForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
