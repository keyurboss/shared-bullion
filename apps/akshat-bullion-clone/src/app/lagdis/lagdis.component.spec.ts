import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAGDISComponent } from './lagdis.component';

describe('LAGDISComponent', () => {
  let component: LAGDISComponent;
  let fixture: ComponentFixture<LAGDISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LAGDISComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LAGDISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
