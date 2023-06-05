import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankdetailsComponent } from './bank-details.component';

describe('BankdetailsComponent', () => {
  let component: BankdetailsComponent;
  let fixture: ComponentFixture<BankdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankdetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
