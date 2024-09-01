import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom([
            BrowserAnimationsModule,
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: !isDevMode(),
                registrationStrategy: 'registerWhenStable:30000'
            }),
        ])
    ]
};