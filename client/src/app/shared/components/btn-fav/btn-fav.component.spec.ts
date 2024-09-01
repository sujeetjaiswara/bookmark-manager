import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFavComponent } from './btn-fav.component';

describe('BtnFavComponent', () => {
  let component: BtnFavComponent;
  let fixture: ComponentFixture<BtnFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnFavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
