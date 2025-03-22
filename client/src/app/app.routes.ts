import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Authentication | Bookmark Manager',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'bookmarks',
    title: 'All Bookmarks | Bookmark Manager',
    loadComponent: () => import('./pages/bookmark-lists/bookmark-lists.component'),
  },
  // {
  //   path: 'fav-bookmarks',
  //   title: 'Favorite Collections | Bookmark Manager',
  //   loadComponent: () => import('./pages/bookmark-favourites/bookmark-favourites.component'),
  // },
  {
    path: 'add-bookmark',
    title: 'Create New Bookmark | Bookmark Manager',
    loadComponent: () => import('./pages/bookmark-add/bookmark-add.component'),
  },
  {
    path: 'edit-bookmark/:id',
    title: 'Modify Bookmark | Bookmark Manager',
    loadComponent: () => import('./pages/bookmark-add/bookmark-add.component'),
  },
];
