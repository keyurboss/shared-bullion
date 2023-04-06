import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shiv-bull-clone'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shiv-bull-clone');
  });

  it('should render Main Div', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const MAinDiv = compiled.getElementsByClassName('main-div')
    expect(MAinDiv).toHaveLength(1)
    expect(MAinDiv[0]).toBeInstanceOf(HTMLElement)
  });
  it('should render Router Outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const RouterOutLet = compiled.querySelectorAll('router-outlet')
    expect(RouterOutLet).toHaveLength(1)
    expect(RouterOutLet[0]).toBeInstanceOf(HTMLElement)
  });
});
