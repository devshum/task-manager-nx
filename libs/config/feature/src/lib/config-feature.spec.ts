import { APP_CONFIG, provideAppConfig } from './config-feature';

describe('config', () => {
  it('should return a provider with the given AppConfig', () => {
    const config = { baseUrl: 'test' };
    const provider = provideAppConfig(config);
    expect(provider).toEqual({ provide: APP_CONFIG, useValue: config });
  });
});
