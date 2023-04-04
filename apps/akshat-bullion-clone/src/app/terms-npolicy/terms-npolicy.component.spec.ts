import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsNpolicyComponent } from './terms-npolicy.component';

describe('TermsNpolicyComponent', () => {
  let component: TermsNpolicyComponent;
  let fixture: ComponentFixture<TermsNpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsNpolicyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsNpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
