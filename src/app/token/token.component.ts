import { Component, OnInit, Input } from '@angular/core';
import { TelegramBotApiService, Update, User } from '../telegram-bot-api.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'tb-token',
  template: `

  <div class="token">  
    <mat-form-field class="token-input" *ngIf="!activated else elseBlock">
      <input matInput placeholder="Bot token" [(ngModel)]="token">
    </mat-form-field>
    <ng-template #elseBlock>
      <span class="token-name">{{'@' + user.username + ' (' + user.first_name + ')'}}</span>
    </ng-template>

    <span class="spacer"></span>
    
    <mat-slide-toggle color="warn" 
                      (change)="activate($event)"
                      [(ngModel)]="activated">Activate</mat-slide-toggle>
  </div>

  `,
  styles: [ `
    .token { display: flex; align-items: center }

    .token-input { flex: 1 }
    .token-name { flex: 1 1 20% }

    .spacer { flex: 1 1 auto }

  ` ] })
export class TokenComponent implements OnInit {
  activated: boolean = false
  token: string = ''
  @Input() user: User = new User()

  constructor(private telegram: TelegramBotApiService) { }

  activate(event: MatSlideToggleChange) {    
    if (event.checked) {
      this.telegram.getMe(this.token)
                   .subscribe((user: User) => this.user = user)
      //  this.activated = false
    }
  }

  ngOnInit() {
    // this.telegram.getMe()
    //              .subscribe((user: User) => 
    //                           (console.log(user), this.name = `@${user.username} (${user.first_name})`))
    // this.telegram.getUpdates()
    //              .subscribe((update: Update) => 
    //                           (console.log(update)))
  }

}
