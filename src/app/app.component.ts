import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppConfig, provideAppConfig } from '@task-manager/shared/config';
import { shellRoutes } from '@task-manager/shell/feature';
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

export class AppComponent {
  static bootstrap(config: AppConfig) {
    return bootstrapApplication(this, {
      providers: [provideRouter(shellRoutes), provideAppConfig(config)],
    }).catch((err) => console.error(err));
  }
}
