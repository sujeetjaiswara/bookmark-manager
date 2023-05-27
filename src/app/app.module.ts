import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layouts/nav/nav.component';
import { BookmarkAddComponent } from './pages/bookmark-add/bookmark-add.component';
import { BookmarkFavouritesComponent } from './pages/bookmark-favourites/bookmark-favourites.component';
import { BookmarkItemComponent } from './pages/bookmark-lists/bookmark-item/bookmark-item.component';
import { BookmarkListsComponent } from './pages/bookmark-lists/bookmark-lists.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BookmarkListsComponent,
    BookmarkFavouritesComponent,
    LoginComponent,
    BookmarkAddComponent,
    BookmarkItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
