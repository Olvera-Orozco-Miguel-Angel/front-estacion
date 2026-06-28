import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindCardComponent } from './wind-card.component';

describe('WindCardComponent', () => {
  let component: WindCardComponent;
  let fixture: ComponentFixture<WindCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindCardComponent]
    });
    fixture = TestBed.createComponent(WindCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
