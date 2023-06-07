import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
  ]
})
export class LoginComponent {

  constructor(private _router: Router) { }

  onLogin(e: Event) {
    e.preventDefault();
    this._router.navigate(['bookmarks']);
  }

}
