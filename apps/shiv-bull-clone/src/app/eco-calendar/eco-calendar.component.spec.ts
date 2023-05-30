import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoCalendarComponent } from './eco-calendar.component';

describe('EcoCalendarComponent', () => {
  let component: EcoCalendarComponent;
  let fixture: ComponentFixture<EcoCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcoCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EcoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
