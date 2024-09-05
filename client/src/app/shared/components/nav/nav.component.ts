import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule],
})
export class NavComponent {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  async onLogout(e: Event) {
    e.stopPropagation();
    this._authService.isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
    await this._router.navigate(['login']);
  }
}
