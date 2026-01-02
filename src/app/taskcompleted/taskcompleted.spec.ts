import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskcompleted } from './taskcompleted';

describe('Taskcompleted', () => {
  let component: Taskcompleted;
  let fixture: ComponentFixture<Taskcompleted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskcompleted]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taskcompleted);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
