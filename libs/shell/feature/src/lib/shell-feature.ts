import { Route } from '@angular/router';

export const shellRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: async () => (await import('@task-manager/tasks/feature')).tasksRoutes,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];
