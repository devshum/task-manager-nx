import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  template: `<router-outlet />`,
  imports: [RouterModule],
  selector: 'tm-root',
})
export class AppComponent {
  static bootstrap() {
    return bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(
          RouterModule.forRoot(
            [
              {
                path: '',
                loadChildren: () => import('@task-manager/tasks-dashboard').then((m) => m.MYLIB_ROUTES),
              },
            ],
            { initialNavigation: 'enabledBlocking' },
          ),
        ),
      ],
    }).catch((err) => console.error(err));
  }
}
