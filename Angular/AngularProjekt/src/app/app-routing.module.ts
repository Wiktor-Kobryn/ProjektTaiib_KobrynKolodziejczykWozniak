import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventTaskComponent } from './event-task/event-task.component';
import { EventTaskAddComponent } from './event-task-add/event-task-add.component';
import { ProfileComponent } from './profile/profile.component';
import { EventActivityComponent } from './event-activity/event-activity.component';
import { FriendsAddComponent } from './friends-add/friends-add.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EventChartComponent } from './event-chart/event-chart.component';
import { SignUpComponent } from './sign-up/sign-up.component';
const routes: Routes = [
  {path: 'dashboard', component: EventsComponent},
  {path: 'event/eventTask/add/:eventId', component: EventTaskAddComponent},
  {path: 'event/Task/:eventId', component: EventTaskComponent},
  {path: 'event/Activity/:eventId', component: EventActivityComponent},
  {path: 'event/Chart/:eventId', component: EventChartComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'friends', component: FriendsAddComponent},
  {path: 'adminpanel', component: AdminPanelComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
