/* eslint-disable brace-style */
/* eslint-disable max-len */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    template: `<div class="container-fluid">
    <app-menu></app-menu>
    <div class="container-fluid mt-2">
      <h1>Welcome</h1>
      <p>This is part of the app.component. Below is the router outlet.</p>
      <hr>
      <router-outlet></router-outlet>
      <hr>
      <p>You can <a routerLink="/url-without-route">go to a url without a route</a> to see the fallback route.</p>
      <hr>
      <p>
        <button class="btn btn-success mr-1" (click)='login()'>login</button>
        <button class="btn btn-primary mr-1" (click)='logout()'>logout</button>
        <button class="btn btn-link mr-1" (click)='logoutExternally()'>logout externally...</button>
      </p>
      <p>
        <button class="btn btn-warning mr-1" (click)='refresh()'>force silent refresh</button>
        <button class="btn btn-secondary mr-1" (click)='reload()'>reload page</button>
        <button class="btn btn-danger mr-1" (click)='clearStorage()'>clear storage</button>
      </p>
      <hr>
      <table class="table table-bordered table-sm table-props">
        <tr><th>IsAuthenticated</th><td><code id="isAuthenticated">{{isAuthenticated$ | async}}</code></td></tr>
        <tr><th>HasValidToken</th><td><code id="hasValidToken">{{hasValidToken}}</code></td></tr>
        <tr><th>IsDoneLoading</th><td><code id="isDoneLoading">{{isDoneLoading$ | async}}</code></td></tr>
        <tr><th>CanActivateProtectedRoutes</th><td><code id="canActivateProtectedRoutes">{{canActivateProtectedRoutes$ | async}}</code></td></tr>
        <tr><th>IdentityClaims</th><td class="pre"><code id="identityClaims">{{identityClaims | json}}</code></td></tr>
        <tr><th>RefreshToken</th><td><code class="break-all">{{refreshToken}}</code></td></tr>
        <tr><th>AccessToken</th><td><code class="break-all">{{accessToken}}</code></td></tr>
        <tr><th>IdToken</th><td><code class="break-all">{{idToken}}</code></td></tr>
      </table>
    </div>
  </div>`,
    standalone: false
})
export class AppComponent {
  isAuthenticated$: Observable<boolean>;
  isDoneLoading$: Observable<boolean>;
  canActivateProtectedRoutes$: Observable<boolean>;

  constructor(
    private authService: AuthService,
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isDoneLoading$ = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes$ = this.authService.canActivateProtectedRoutes$;
  }

  login() { this.authService.login(); }
  logout() { this.authService.logout(); }
  refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }
  clearStorage() { localStorage.clear(); }

  logoutExternally() {
    window.open(this.authService.logoutUrl);
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { return this.authService.accessToken; }
  get refreshToken() { return this.authService.refreshToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }
}
