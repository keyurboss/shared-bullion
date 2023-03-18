import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LIVERATEComponent } from './live-rate.component';

describe('LIVERATEComponent', () => {
  let component: LIVERATEComponent;
  let fixture: ComponentFixture<LIVERATEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LIVERATEComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LIVERATEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
