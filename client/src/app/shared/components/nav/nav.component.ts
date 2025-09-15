import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { Auth } from '../../services';

@Component({
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, InputTextModule, ButtonModule, PopoverModule],
})
export class NavComponent {
  #router = inject(Router);
  #authService = inject(Auth);

  async onLogout(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.#authService.isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');

    await this.#router.navigate(['login']);
  }
}
