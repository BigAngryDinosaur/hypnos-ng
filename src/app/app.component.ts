import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hypnos-ng';

  constructor(private auth: AuthService) {}

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated()
  }

  logoutClicked() {
    this.auth.logout()
  }
}
