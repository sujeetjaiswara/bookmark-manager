import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkAddComponent } from './pages/bookmark-add/bookmark-add.component';
import { BookmarkFavouritesComponent } from './pages/bookmark-favourites/bookmark-favourites.component';
import { BookmarkListsComponent } from './pages/bookmark-lists/bookmark-lists.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: 'bookmarks',
    title: 'Bookmarks',
    component: BookmarkListsComponent
    // loadChildren: () => import('./pages/bookmark-lists').then(m => m.HomeModule),
  },
  {
    path: 'fav-bookmarks',
    title: 'Fav Bookmarks',
    component: BookmarkFavouritesComponent
  },
  {
    path: 'add-bookmark',
    title: 'Add Bookmark',
    component: BookmarkAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
