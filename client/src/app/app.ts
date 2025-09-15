import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Auth } from '@core/services';
import { NavComponent } from '@shared/components';
import { environment } from 'environments/environment';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'bm-root',
  imports: [NavComponent, RouterOutlet, ToastModule, NgProgressbar, NgProgressRouter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  readonly #updates = inject(SwUpdate);
  readonly #authService = inject(Auth);
  readonly #primeng = inject(PrimeNG);
  readonly #destroyRef = inject(DestroyRef);
  protected isAuth = signal(false);

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
    this.#primeng.ripple.set(true);

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      this.isAuth.set(true);
      this.#authService.isAuthenticated.set(true);
    }
  }
}
