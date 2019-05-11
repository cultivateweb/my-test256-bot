import { Component, OnInit, Input } from '@angular/core';
import { Update, TelegramBotApiService } from '../telegram-bot-api.service';

@Component({
  selector: 'tb-chats',
  template: `
    <mat-tab-group>
      <mat-tab *ngFor="let tab of tabs" label="{{tab.name}}">       
        <div class="messages">
          <div class="message" *ngFor="let msg of tab.messages">{{msg}}</div>
        </div>
      </mat-tab>
    </mat-tab-group>

  `,
  styles: [`
    .message{ padding: 5px; border-bottom: 1px solid silver; margin-bottom: 5px; margin-top: 15px }
  `]
})
export class ChatsComponent implements OnInit {

  // @Input() updates: Update[] = []

  tabs: Chat[] = [
    // new Chat("1", ["msg1", "msg2"]),
    // new Chat("2", ["msg3", "msg4"]),
  ]

  lastUpdate: number = 0
  // name: string
  // updates: Update[] = []


  constructor(private telegram: TelegramBotApiService) { }

  ngOnInit() {
  }

  connected() {
    
    this.telegram.getUpdates(this.lastUpdate)
                 .subscribe((updates: Update[]) => {

    //                   console.log(updates)

    //                   // this.lastUpdate = 897925397

                      
    //                   // updates[0].message.chat.id
    //                   // updates[0].message.from.username

                 })


    // console.log("connected")

  }

  disconnected() {
    
    // console.log("disconnected")

  }



}

class Chat {
  name: string
  messages: string[]

  constructor(name: string, messages: string[]) { 
    this.name = name
    this.messages = messages
  }

}