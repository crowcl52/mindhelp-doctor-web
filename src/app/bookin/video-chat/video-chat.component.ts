import { Component, OnInit, ChangeDetectorRef, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from 'src/app/services/opentok.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { VideoSettings } from 'src/app/redux/ui.reducer';
import { SetVideoSettings } from 'src/app/redux/ui.actions';


@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements OnInit, OnDestroy {
  title = 'Angular Basic Video Chat';
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  uiSUbscription: Subscription = new Subscription();
  video:VideoSettings = {
    video: true,
    audio: true
  }

  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private store: Store<AppState>) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
    })
    .then(() => this.opentokService.connect())
    .catch((err) => {
      console.error(err);
      alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
    });

    this.uiSUbscription = this.store.select('ui').subscribe( d=>{
      console.log(d.video)
      this.video = d.video;
    } )

  }

  ngOnDestroy(){
    this.opentokService.disconnect();
    this.uiSUbscription.unsubscribe();
  }

  videoSettings(type){
    if(type == 'video'){
      this.video.video = !this.video.video;
    }else{
      this.video.audio = !this.video.audio;
    }
    this.store.dispatch( new SetVideoSettings( {...this.video} ) );
  }
}
