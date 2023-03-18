import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BANKDETAILSComponent } from './bank-details.component';

describe('BANKDETAILSComponent', () => {
  let component: BANKDETAILSComponent;
  let fixture: ComponentFixture<BANKDETAILSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BANKDETAILSComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BANKDETAILSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
