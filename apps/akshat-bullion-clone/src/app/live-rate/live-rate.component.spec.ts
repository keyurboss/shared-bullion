import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRateComponent } from './live-rate.component';

describe('LiveRateComponent', () => {
  let component: LiveRateComponent;
  let fixture: ComponentFixture<LiveRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveRateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
