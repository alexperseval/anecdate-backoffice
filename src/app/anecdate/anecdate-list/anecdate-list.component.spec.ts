import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnecdateListComponent } from './anecdate-list.component';

describe('AnecdateListComponent', () => {
  let component: AnecdateListComponent;
  let fixture: ComponentFixture<AnecdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnecdateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnecdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
