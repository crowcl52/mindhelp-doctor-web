import { Component, ElementRef, AfterViewInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { OpentokService } from 'src/app/services/opentok.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements AfterViewInit, OnDestroy {

  @ViewChild('publisherDiv', { static: false }) publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;

  uiSubscription: Subscription = new Subscription();

  constructor(private opentokService: OpentokService, private store: Store<AppState>) {
    this.publishing = false;
  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, { insertMode: 'append' });

    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
    }
    // REdux conection
    this.uiSubscription = this.store.select('ui').subscribe(data => {
      // Pausar video
      this.publisher.publishVideo(data.video.video);
      // Pausar audio
      this.publisher.publishAudio(data.video.audio);
    })
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
    this.session.unpublish(this.publisher);
  }

}