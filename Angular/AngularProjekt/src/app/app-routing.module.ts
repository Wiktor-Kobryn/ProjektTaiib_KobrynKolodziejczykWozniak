import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventTaskAddComponent } from './event-task-add/event-task-add.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsAddComponent } from './friends-add/friends-add.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  {path: 'dashboard', component: EventsComponent},
  {path: 'event/eventTask/add/:eventId', component: EventTaskAddComponent},
  {path: 'event/:eventId', component: EventDetailsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'friends', component: FriendsAddComponent},
  {path: 'adminpanel', component: AdminPanelComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
