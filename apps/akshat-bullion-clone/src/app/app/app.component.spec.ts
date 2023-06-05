import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAppComponent } from './app.component';

describe('MAppComponent', () => {
  let component: MAppComponent;
  let fixture: ComponentFixture<MAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
