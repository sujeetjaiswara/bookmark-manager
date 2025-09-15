import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from './app.routes';
import { MyPreset } from './core/my-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      BrowserAnimationsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      }),
    ]),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
    MessageService,
    DialogService,
  ],
};
