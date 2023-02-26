import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
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
export class AppComponent {
  static bootstrap() {
    return bootstrapApplication(this, {
      providers: [provideRouter(appRoutes)],
    }).catch((err) => console.error(err));
  }
}
