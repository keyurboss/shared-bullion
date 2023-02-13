import { ComponentFixture, TestBed } from '@angular/core/testing';
  
import { RateTables2Component } from './rate-tables-2.component';

describe('RateTablesComponent', () => {
  let component: RateTables2Component;
  let fixture: ComponentFixture<RateTables2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
