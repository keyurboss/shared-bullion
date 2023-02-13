import { faker } from "@faker-js/faker";
import { LiveRateService } from "../services/live-rate.service";
import { RatesFixture } from "../fixtures";
import { BaseSymbolePriceInterface, RateBaseSymboles } from "@rps/bullion-interfaces";

export class DemoLiveRateService extends LiveRateService {
    InitRemoteConnection(): void {
      this.Gold();
      this.Silver();
      this.SilverSpot();
      this.GoldSpot();
      this.INR();
    }
    private Silver() {
      const timeout = faker.datatype.number({
        max: 0.15,
        min: 0.05,
        precision: 0.01,
      });
      const SILVER = RatesFixture.Generate(
        {
          bottom: 65000,
          top: 68000,
        },
        {
          top: 15,
          bottom: 0,
        },
        this.LastRate[RateBaseSymboles.SILVER]
      );
      this.setRate({
        SILVER,
        SILVER_MCX: SILVER,
      });
      setTimeout(() => {
        this.Silver();
      }, timeout);
    }
    private Gold() {
      const timeout = faker.datatype.number({
        max: 0.15,
        min: 0.05,
        precision: 0.01,
      });
      const GOLD = RatesFixture.Generate(
        {
          bottom: 56000,
          top: 57000,
        },
        {
          top: 15,
          bottom: 0,
        },
        this.LastRate[RateBaseSymboles.GOLD]
      );
      this.setRate({
        GOLD,
        GOLD_MCX: GOLD,
      });
      setTimeout(() => {
        this.Gold();
      }, timeout);
    }
    private SilverSpot() {
      const timeout = faker.datatype.number({
        max: 0.15,
        min: 0.05,
        precision: 0.01,
      });
      const SILVER_SPOT = RatesFixture.Generate(
        {
          top: 25,
          bottom: 23,
          points: 0.01,
        },
        {
          top: 2,
          bottom: 0,
          points: 0.01,
        },
        this.LastRate[RateBaseSymboles.SILVER_SPOT]
      );
      this.setRate({
        SILVER_SPOT,
      });
      setTimeout(() => {
        this.SilverSpot();
      }, timeout);
    }
  
    private GoldSpot() {
      const timeout = faker.datatype.number({
        max: 0.15,
        min: 0.05,
        precision: 0.01,
      });
      const GOLD_SPOT = RatesFixture.Generate(
        {
          bottom: 1800,
          top: 1900,
          points: 0.01,
        },
        {
          top: 2,
          bottom: 1,
          points: 0.01,
        },
        this.LastRate[RateBaseSymboles.GOLD_SPOT]
      );
      this.setRate({
        GOLD_SPOT,
      });
      setTimeout(() => {
        this.GoldSpot();
      }, timeout);
    }
  
    private INR() {
      const timeout = faker.datatype.number({
        max: 0.15,
        min: 0.05,
        precision: 0.01,
      });
      const INR = RatesFixture.Generate(
        {
          top: 82,
          bottom: 81,
          points: 0.0001,
        },
        {
          top: 1,
          bottom: 0,
          points: 0.0001,
        },
        this.LastRate[RateBaseSymboles.INR]
      );
      this.setRate({
        INR,
      });
      setTimeout(() => {
        this.INR();
      }, timeout);
    }
    async getLastRates(): Promise<
      Record<RateBaseSymboles, BaseSymbolePriceInterface>
    > {
      return RatesFixture.GenerateForAllSymboles();
    }
  }