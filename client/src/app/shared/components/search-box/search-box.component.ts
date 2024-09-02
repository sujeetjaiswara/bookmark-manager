import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bm-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {}
