import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppConfig, provideAppConfig } from '@task-manager/shared/config';
import { appRoutes } from './app.routes';
@Component({
  standalone: true,
  template: `
    <main>
      <router-outlet />
    </main>
  `,
  imports: [RouterModule],
  selector: 'tm-root',
})
//  TODO move appRoutes to a shell lib
export class AppComponent {
  static bootstrap(config: AppConfig) {
    return bootstrapApplication(this, {
      providers: [provideRouter(appRoutes), provideAppConfig(config)],
    }).catch((err) => console.error(err));
  }
}
