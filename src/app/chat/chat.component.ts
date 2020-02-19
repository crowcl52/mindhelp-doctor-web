import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor( private service: AuthService ) { }

  ngOnInit() {
    this.getChats();
  }

  getChats(){
    let data = {
      time_zone: 'America/Regina'
    }

    let encData = {data:this.service.encrypt(data,"private")};
    this.service.getChats(encData).subscribe((d:any)=>{
      let data = JSON.parse(this.service.decrypt(d.data,"private"));
      console.log(data)
    },err =>{
      console.log(err)
    })
  }

}
