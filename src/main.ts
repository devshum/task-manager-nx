import { AppComponent } from './app/app.component';

(async () => {
  const config = await fetch('assets/app/config.json').then((config) => config.json());
  AppComponent.bootstrap(config);
})();
