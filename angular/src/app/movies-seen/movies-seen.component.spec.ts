import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSeenComponent } from './movies-seen.component';

describe('MoviesSeenComponent', () => {
  let component: MoviesSeenComponent;
  let fixture: ComponentFixture<MoviesSeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesSeenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesSeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
