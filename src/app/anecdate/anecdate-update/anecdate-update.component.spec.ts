import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnecdateUpdateComponent } from './anecdate-update.component';

describe('AnecdateUpdateComponent', () => {
  let component: AnecdateUpdateComponent;
  let fixture: ComponentFixture<AnecdateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnecdateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnecdateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
