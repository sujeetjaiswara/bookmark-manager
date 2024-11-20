import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'bm-btn-fav',
  imports: [],
  templateUrl: './btn-fav.component.html',
  styleUrl: './btn-fav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnFavComponent {
  readonly isLiked = input(false);
  readonly toggleFav = output();

  onToggle(e: Event) {
    e.preventDefault();
    this.toggleFav.emit();
  }
}
