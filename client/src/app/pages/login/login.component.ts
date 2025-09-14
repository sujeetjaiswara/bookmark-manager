import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextModule, CardModule, ButtonModule],
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
