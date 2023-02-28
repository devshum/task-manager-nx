import { inject, InjectionToken, Provider } from '@angular/core';
import { AppConfig } from './interfaces';

export const APP_CONFIG = new InjectionToken<AppConfig>('The App Config');

export function provideAppConfig(config: AppConfig): Provider {
  return { provide: APP_CONFIG, useValue: config };
}

export function injectAppConfig() {
  return inject(APP_CONFIG);
}
