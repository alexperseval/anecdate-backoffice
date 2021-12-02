import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnecdateQuizComponent } from './anecdate-quiz.component';

describe('AnecdateQuizComponent', () => {
  let component: AnecdateQuizComponent;
  let fixture: ComponentFixture<AnecdateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnecdateQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnecdateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
