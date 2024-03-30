import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
  ]
})
export class NavComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  onLogout() {
    this._authService.isAuthenticated = false;
    this._router.navigate(['login']);
  }
}
