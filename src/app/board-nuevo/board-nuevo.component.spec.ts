import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNuevoComponent } from './board-nuevo.component';

describe('BoardNuevoComponent', () => {
  let component: BoardNuevoComponent;
  let fixture: ComponentFixture<BoardNuevoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardNuevoComponent]
    });
    fixture = TestBed.createComponent(BoardNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
