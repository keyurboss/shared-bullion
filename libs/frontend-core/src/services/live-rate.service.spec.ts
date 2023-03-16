import { LiveRateService } from './live-rate.service';
// import faker from '@faker-js/faker';
import { RatesFixture } from '../fixtures';
import { firstValueFrom } from 'rxjs';
import { DemoLiveRateService } from '../mock';
import { JsonToItrable } from '../core';

describe('ABS LiveRateService', () => {
  let service: LiveRateService;

  it('should be created with last Rate It is Injected and Rates Should be ready', () => {
    const rates = RatesFixture.GenerateForAllSymboles();
    service = new DemoLiveRateService(rates, null as never,false);
    service.InitRemoteConnection();
    expect(service.LastRate).toStrictEqual(new Map(JsonToItrable(rates)));
    expect(service.RatesReady).toStrictEqual(true);
    expect(firstValueFrom(service.RatesReady$)).resolves.toStrictEqual(true);
  });
  it.todo('Write Tests For Subject Value And HIGH Low')
  it.todo('Auto Connect to Server')
});
