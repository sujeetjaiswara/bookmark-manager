import { TestBed } from '@angular/core/testing';

import { Bookmarks } from './bookmarks';

describe('Bookmarks', () => {
  let service: Bookmarks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bookmarks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
