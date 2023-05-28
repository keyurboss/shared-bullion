import { EntityError } from './entity.error';

type ApplianceNameNotRecognizedOptions = {
  name: string;
  kioskSerial?: string;
};

export class ApplianceNameNotRecognizedError extends EntityError {
  constructor(options: ApplianceNameNotRecognizedOptions) {
    super(
      options.kioskSerial
        ? `Appliance name ${options.name} not recognized for kiosk ${options.kioskSerial}`
        : `Appliance name ${options.name} not recognized`,
    );
  }
}
