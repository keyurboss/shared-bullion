import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LagdisComponent } from './lagdis.component';

describe('LagdisComponent', () => {
  let component: LagdisComponent;
  let fixture: ComponentFixture<LagdisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LagdisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LagdisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
