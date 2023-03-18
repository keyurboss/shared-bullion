import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MESSAGESComponent } from './messages.component';

describe('MESSAGESComponent', () => {
  let component: MESSAGESComponent;
  let fixture: ComponentFixture<MESSAGESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MESSAGESComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MESSAGESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
