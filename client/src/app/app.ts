import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { Auth, NavComponent } from './shared';

@Component({
  selector: 'bm-app',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  #updates = inject(SwUpdate);
  #authService = inject(Auth);
  #destroyRef = inject(DestroyRef);
  isAuth = signal(false);

  constructor() {
    console.log(`envTitle: ${environment.envTitle}`);

    this.#updates.versionUpdates.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(evt => {
      if (evt.type === 'VERSION_READY') {
        console.info(`👉Current app version: ${evt.currentVersion.hash}`);
        console.info(`✅New app version ready for use: ${evt.latestVersion.hash}`);
        // const cnf = this._snackBar.open('New app version ready for use.', 'Okay');
        // cnf.afterDismissed().subscribe(() => location.reload());
      }
    });

    effect(() => {
      this.isAuth.set(this.#authService.isAuthenticated());
    });
  }

  ngOnInit(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      this.isAuth.set(true);
      this.#authService.isAuthenticated.set(true);
    }
  }
}
