import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@core/services';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextModule, CardModule, ButtonModule],
})
export default class LoginComponent {
  #router = inject(Router);
  #authService = inject(Auth);

  onLogin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    this.#authService.isAuthenticated.set(true);
    this.#router.navigate(['bookmarks']);
  }
}
