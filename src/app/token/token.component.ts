import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TelegramBotApiService, Update, User, Message } from '../telegram-bot-api.service';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'tb-token',
  template: `
    <div class="token">  
      <mat-form-field class="token-input" *ngIf="!activated else elseBlock">
        <input matInput placeholder="Bot token" [(ngModel)]="token">
      </mat-form-field>
      <ng-template #elseBlock>
        <div class="token-info">{{'@'+user.username+' ('+user.first_name+')'}}</div>
      </ng-template>
      <mat-slide-toggle color="warn" 
                        (change)="onActivate($event)"
                        [(ngModel)]="activated"
                        class="token-activator"></mat-slide-toggle>
    </div>`,
  styles: [ `
    .token { display: flex;  align-items: center }
    .token-input{ flex: 1 1; margin-right: 10px }
    .token-info{ flex: 1 1; line-height: 1.3; width: 100px; white-space: normal }
    .token-activator { flex: 0 0 }` ] })
export class TokenComponent implements OnInit {
  activated: boolean = false

  user: User = new User()

  @Input() token: string
  @Output() connected: EventEmitter<void> = new EventEmitter<void>()  
  @Output() disconnected: EventEmitter<void> = new EventEmitter<void>()
  
  constructor(private telegram: TelegramBotApiService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  onActivate(event: MatSlideToggleChange) {    
    if (event.checked) {
      this.telegram.setToken(this.token)

      this.telegram.getMe()
                   .subscribe((user: User) => {
                                this.user = user
                                this.connected.emit()
                              }, 
                              (response: HttpErrorResponse) => {
                                //console.log(response)
                                this.activated = false
                                this.snackBar.open(response.error.description, 
                                                   "", 
                                                   {duration: 2000})
                              })
    } else {
      this.activated = false
      this.disconnected.emit()
    }
  }

}
