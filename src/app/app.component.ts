import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _updates: SwUpdate,
    private _snackBar: MatSnackBar
  ) {
    _updates.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.info(`⌛Downloading new app version: ${evt.version.hash}`);
          break;

        case 'VERSION_READY':
          console.info(`👉Current app version: ${evt.currentVersion.hash}`);
          console.info(`✅New app version ready for use: ${evt.latestVersion.hash}`);
          const cnf = this._snackBar.open('New app version ready for use.', 'Okay');
          cnf.afterDismissed().subscribe(() => location.reload());
          break;

        case 'VERSION_INSTALLATION_FAILED':
          console.info(`❌Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }
}
