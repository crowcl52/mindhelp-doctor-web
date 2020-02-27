import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { CleartChatHistory } from '../redux/chat-history.actions';
import { ChangeTitleNav } from '../redux/ui.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  chatList = [];
  chatHistory = [];
  chatInput = "";
  curentChatId = 0;
  currentChat: any = null;
  chatSubscribe: Subscription = new Subscription();

  constructor( private service: AuthService, private store: Store<AppState> ) { }

  ngOnInit() {
    this.getChats();
    this.chatSubscribe = this.store.select('chatHistory').subscribe( c =>{
      this.chatHistory = c.data;
    } )
    this.store.dispatch( new ChangeTitleNav("Chats"))
  }

  ngOnDestroy(){
    this.chatSubscribe.unsubscribe()
    this.store.dispatch( new CleartChatHistory() );
    this.store.dispatch( new ChangeTitleNav(""))

  }

  getChats(){
    let data = {
      time_zone: 'America/Regina'
    }

    let encData = {data:this.service.encrypt(data,"private")};
    this.service.getChats(encData).subscribe((d:any)=>{
      let data = JSON.parse(this.service.decrypt(d.data,"private"));
      this.chatList = data.chat_list;
    },err =>{
      console.log(err)
    })
  }

  getChatHistory(c){
    console.log(c)
    this.curentChatId = c.id
    this.currentChat = c;

    let data = {
      app_id: c.app_id,
      user_id: c.user_id,
      doc_id: c.doc_id,
      time_zone: 'America/Regina'
    }
    let encData = {data:this.service.encrypt(data,"private")};

    this.service.getChatHistory(encData);
  }

  onSubmit(){
    let c = this.currentChat;

    let data = {
      app_id: c.app_id,
      user_id: c.user_id,
      doc_id: c.doc_id,
      mtype: 'TEXT',
      message: this.chatInput,
      from:'user',
      time_zone: 'America/Regina'
    }

    console.log(data)

    let encData = {data:this.service.encrypt(data,"")};

    this.service.saveChat(data).subscribe((d: any) => {
      let data = JSON.parse(this.service.decrypt(d.data, "private"));
      console.log(data)
    }, err => {
      console.log(err)
    });

    this.chatInput = "";
  }

}
