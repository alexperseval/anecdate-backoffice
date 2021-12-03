import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnecdateDetailComponent } from './anecdate-detail.component';

describe('AnecdateDetailComponent', () => {
  let component: AnecdateDetailComponent;
  let fixture: ComponentFixture<AnecdateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnecdateDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnecdateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
