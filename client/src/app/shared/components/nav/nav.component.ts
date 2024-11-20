import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import type { DropdownInterface, DropdownOptions, InstanceOptions } from 'flowbite';
import { Dropdown } from 'flowbite';
import { AuthService } from '../../services/auth.service';
import { GlobalSearchComponent } from '../global-search/global-search.component';

@Component({
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, GlobalSearchComponent],
})
export class NavComponent implements AfterViewInit {
  #router = inject(Router);
  #authService = inject(AuthService);
  collapse!: DropdownInterface;

  ngAfterViewInit(): void {
    const $targetEl: HTMLElement | null = document.getElementById('user-dropdown');
    const $triggerEl: HTMLElement | null = document.getElementById('user-menu-button');

    const options: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
    };

    const instanceOptions: InstanceOptions = {
      id: 'dropdownMenu',
      override: true,
    };

    this.collapse = new Dropdown($targetEl, $triggerEl, options, instanceOptions);
  }

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
