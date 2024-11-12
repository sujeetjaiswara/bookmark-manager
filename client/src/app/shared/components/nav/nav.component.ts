import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GlobalSearchComponent } from '../global-search/global-search.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, GlobalSearchComponent],
})
export class NavComponent {
  #router = inject(Router);
  #authService = inject(AuthService);

  onAdd(e: Event) {
    e.preventDefault();
    this.#router.navigate(['add-bookmark']);
  }

  async onLogout(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.#authService.isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
    await this.#router.navigate(['login']);
  }
}
