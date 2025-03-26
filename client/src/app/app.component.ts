import { CommonModule } from '@angular/common';
// prettier-ignore
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
// import { initFlowbite } from 'flowbite';
import { environment } from 'src/environments/environment';
import { NavComponent } from './shared/components/nav/nav.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavComponent, CommonModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  #updates = inject(SwUpdate);
  #authService = inject(AuthService);
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
    // initFlowbite();

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      this.isAuth.set(true);
      this.#authService.isAuthenticated.set(true);
    }
  }
}
