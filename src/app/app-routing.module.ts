import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookinComponent } from './bookin/bookin.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
import { PanelComponent } from './panel/panel.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { EditProfileComponent } from './settings/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ContactComponent } from './settings/contact/contact.component';
import { FaqComponent } from './settings/faq/faq.component';
import { VideoChatComponent } from './bookin/video-chat/video-chat.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'panel', component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'booking-now/:id/:cat_id', component: NewBookingComponent },
      { path: 'booking', component: BookinComponent },
      { path: 'video', component: VideoChatComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'settings', component: SettingsComponent,
        children: [
          { path: 'edit-profile', component: EditProfileComponent },
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'faq', component: FaqComponent },
          { path: '**', redirectTo: 'edit-profile' }
        ] 
      },
      { path: '**', redirectTo: 'home' }
    ]
  },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
