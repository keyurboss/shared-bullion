import {
  BaseSymbolePriceInterface,
  RateBaseSymboles,
  RateBaseSymbolesArray,
} from '@rps/bullion-interfaces';
import { LiveRateService } from './live-rate.service';
import faker from '@faker-js/faker';
class LiveRateServiceTests extends LiveRateService {
  async getLastRates(): Promise<
    Record<RateBaseSymboles, BaseSymbolePriceInterface>
  > {
    return {
      GOLD: {
        
      },
      GOLD_MCX: {},
      GOLD_SPOT: {},
      INR: {},
      SILVER: {},
      SILVER_MCX: {},
      SILVER_SPOT: {},
    };
  }
}

describe('ABS LiveRateService', () => {
  let service: LiveRateService;

  beforeEach(() => {
    // service=new LiveRateService()
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
