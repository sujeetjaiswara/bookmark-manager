import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class LoginComponent {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  onLogin(e: Event) {
    e.preventDefault();
    this._authService.isAuthenticated.set(true);
    this._router.navigate(['bookmarks']);
    localStorage.setItem('isAuthenticated', 'true');
  }
}
