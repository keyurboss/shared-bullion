import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABOUTUSComponent } from './about-us.component';

describe('ABOUTUSComponent', () => {
  let component: ABOUTUSComponent;
  let fixture: ComponentFixture<ABOUTUSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ABOUTUSComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ABOUTUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
