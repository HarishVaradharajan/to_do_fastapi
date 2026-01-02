import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tasktocomplete } from './tasktocomplete';

describe('Tasktocomplete', () => {
  let component: Tasktocomplete;
  let fixture: ComponentFixture<Tasktocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tasktocomplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tasktocomplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
