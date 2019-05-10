import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TelegramBotApiService, User } from '../telegram-bot-api.service';

@Component({
  selector: 'tb-navigator',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer 
                   class="sidenav" 
                   fixedInViewport="true"
                   [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
                   [mode]="(isHandset$ | async) ? 'over' : 'side'"
                   [opened]="!(isHandset$ | async)">
        <mat-toolbar>Actions</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item href="#">Action 1</a>
          <a mat-list-item href="#">Action 2</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <mat-toolbar-row>
            <button type="button"
                    aria-label="Toggle sidenav"
                    mat-icon-button
                    (click)="drawer.toggle()"
                    *ngIf="isHandset$ | async">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
            <tb-token class="token"></tb-token>
          </mat-toolbar-row>
        </mat-toolbar>
        <!-- Add Content Here -->

      </mat-sidenav-content>
    </mat-sidenav-container>`,
  styles: [ `
    .sidenav-container { height: 100% }
    .sidenav { width: 200px }
    .sidenav .mat-toolbar { background: inherit }
    .mat-toolbar.mat-primary { position: sticky; top: 0; z-index: 1 }
    .mat-toolbar-row, .mat-toolbar-single-row { height: 100px }
    .token { flex: 1 }
    ` ]
})
export class NavigatorComponent implements OnInit {

  name: string

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
                                                           .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private telegram: TelegramBotApiService) { }

  ngOnInit() {
    // this.telegram.getMe()
    //              .subscribe((user: User) => 
    //                           (console.log(user), this.name = `@${user.username} (${user.first_name})`))
  }


}
