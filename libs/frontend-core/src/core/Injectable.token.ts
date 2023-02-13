import { InjectionToken } from '@angular/core';
import { EnvInterface } from '@rps/bullion-interfaces';

export const Env = new InjectionToken<EnvInterface>('Env Variable');
export const IsServer = new InjectionToken<boolean>('Is Server Injectable');
