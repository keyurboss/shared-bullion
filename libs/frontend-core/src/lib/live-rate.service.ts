import { SymboleWiseRate } from '@rps/bullion-interfaces';
import { BehaviorSubject } from 'rxjs';

export abstract class LiveRateService {
  protected LastRate!: SymboleWiseRate;
  protected RatesReadyBehaviourSubject = new BehaviorSubject(false);
  RatesReady$ = this.RatesReadyBehaviourSubject.asObservable();
  private _RatesReady = false;
  protected get RatesReady() {
    return this._RatesReady;
  }
  protected set RatesReady(value) {
    this._RatesReady = value;
    this.RatesReadyBehaviourSubject.next(value);
  }
  
  // constructor() {}
}
