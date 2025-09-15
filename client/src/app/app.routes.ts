import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login | Bookmark Manager',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'bookmarks',
    title: 'Bookmarks | Bookmark Manager',
    loadComponent: () => import('./pages/bookmarks/bookmarks'),
  },
];
