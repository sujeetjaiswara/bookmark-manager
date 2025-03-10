import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export default class LoginComponent {
  #router = inject(Router);
  #authService = inject(AuthService);

  onLogin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    this.#authService.isAuthenticated.set(true);
    this.#router.navigate(['bookmarks']);
  }
}
