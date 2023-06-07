import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'bookmarks',
        title: 'Bookmarks',
        loadComponent: () => import('./pages/bookmark-lists/bookmark-lists.component').then(m => m.BookmarkListsComponent)
    },
    {
        path: 'fav-bookmarks',
        title: 'Fav Bookmarks',
        loadComponent: () => import('./pages/bookmark-favourites/bookmark-favourites.component').then(m => m.BookmarkFavouritesComponent),
    },
    {
        path: 'add-bookmark',
        title: 'Add Bookmark',
        loadComponent: () => import('./pages/bookmark-add/bookmark-add.component').then(m => m.BookmarkAddComponent),
    },
];