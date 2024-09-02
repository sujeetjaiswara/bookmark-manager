import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { initFlowbite } from 'flowbite';
import { NavComponent } from './shared/components/nav/nav.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavComponent, CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private _updates: SwUpdate,
    // private _snackBar: MatSnackBar
    public _authService: AuthService
  ) {
    _updates.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.info(`⌛Downloading new app version: ${evt.version.hash}`);
          break;

        case 'VERSION_READY':
          console.info(`👉Current app version: ${evt.currentVersion.hash}`);
          console.info(`✅New app version ready for use: ${evt.latestVersion.hash}`);
          // const cnf = this._snackBar.open('New app version ready for use.', 'Okay');
          // cnf.afterDismissed().subscribe(() => location.reload());
          break;

        case 'VERSION_INSTALLATION_FAILED':
          console.info(`❌Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
