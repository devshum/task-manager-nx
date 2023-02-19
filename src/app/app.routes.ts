import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: async () => (await import('@task-manager/tasks')).tasksRoutes,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];
