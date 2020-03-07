import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Redux
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DefaultPageComponent } from './default/default-page/default-page.component';
import { HeaderComponent } from './ui/header/header.component';
import { BookinComponent } from './bookin/bookin.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
import { PanelComponent } from './panel/panel.component';
import { EditProfileComponent } from './settings/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ContactComponent } from './settings/contact/contact.component';
import { FaqComponent } from './settings/faq/faq.component';
import { VideoChatComponent } from './bookin/video-chat/video-chat.component';
import { PublisherComponent } from './bookin/video-chat/publisher/publisher.component';
import { SubscriberComponent } from './bookin/video-chat/subscriber/subscriber.component';
import { LandingComponent } from './landing/landing.component';
import { DeclineModalComponent } from './ui/decline-modal/decline-modal.component';

const config: SocketIoConfig = { url: 'https://mindhelp.mx', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DefaultPageComponent,
    HeaderComponent,
    BookinComponent,
    ChatComponent,
    SettingsComponent,
    PanelComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ContactComponent,
    FaqComponent,
    VideoChatComponent,
    PublisherComponent,
    SubscriberComponent,
    LandingComponent,
    DeclineModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ScrollToModule.forRoot(),
    StoreModule.forRoot( appReducer ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  entryComponents: [
    DeclineModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
