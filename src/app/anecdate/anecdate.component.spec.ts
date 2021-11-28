import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnecdateComponent } from './anecdate.component';

describe('AnecdateComponent', () => {
  let component: AnecdateComponent;
  let fixture: ComponentFixture<AnecdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnecdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnecdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
