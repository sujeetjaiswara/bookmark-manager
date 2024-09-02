import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bm-btn-fav',
  standalone: true,
  imports: [],
  templateUrl: './btn-fav.component.html',
  styleUrl: './btn-fav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnFavComponent {
  @Input() isLiked = false;
  @Output() toggleFav = new EventEmitter();

  onToggle(e: Event) {
    e.preventDefault();
    this.toggleFav.emit();
  }
}
