import {Component, OnInit} from '@angular/core';
import {InruptService} from "../../services/inrupt/inrupt.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-inrupt',
  templateUrl: './inrupt.component.html',
  styleUrls: ['./inrupt.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InruptComponent implements OnInit {
  webId: string;
  oidcIssuer: string = 'https://inrupt.net';

  constructor(
    readonly inruptService: InruptService,
  ) {
  }

  ngOnInit(): void {
    this.handleRedirectAfterLogin();
  }

  async login() {
    if (!this.inruptService.session.info.isLoggedIn) {
      await this.inruptService.session.login({
        // oidcIssuer: 'https://inrupt.net',
        // oidcIssuer: 'https://solidcommunity.net',
        oidcIssuer: this.oidcIssuer,
        redirectUrl: window.location.href,
      });
    }
  }

  logout() {
    this.inruptService.logout();
    window.location.reload();
  }

  async handleRedirectAfterLogin() {
    this.inruptService.session.handleIncomingRedirect(window.location.href)
      .then(sessionInfo => {
        this.webId = sessionInfo.webId;
        console.log(sessionInfo)
      }).finally(() => console.log("promise finished"));

    // behaves the same:
    // await this.inruptService.session.handleIncomingRedirect(window.location.href);
    // this.webId = this.inruptService.getWebId();
  }
}
