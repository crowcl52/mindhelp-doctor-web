import { Component, ElementRef, AfterViewInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { OpentokService } from 'src/app/services/opentok.service';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('publisherDiv',{static:false}) publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;

  constructor(private opentokService: OpentokService) {
    this.publishing = false;
  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {insertMode: 'append'});

    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
    }
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

  ngOnDestroy(){
    // Pausar video
    this.publisher.publishVideo(false);
    // Pausar audio
    this.publisher.publishAudio(false);
    this.session.unpublish(this.publisher);
  }

}