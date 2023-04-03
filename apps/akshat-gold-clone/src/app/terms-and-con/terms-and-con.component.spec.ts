import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConComponent } from './terms-and-con.component';

describe('TermsAndConComponent', () => {
  let component: TermsAndConComponent;
  let fixture: ComponentFixture<TermsAndConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAndConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
