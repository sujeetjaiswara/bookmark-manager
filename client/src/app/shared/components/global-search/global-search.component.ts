import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bm-global-search',
  standalone: true,
  imports: [],
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalSearchComponent {

}
