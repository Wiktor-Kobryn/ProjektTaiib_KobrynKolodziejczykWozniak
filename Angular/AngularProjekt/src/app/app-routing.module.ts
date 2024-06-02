import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {path: 'dashboard', component: EventsComponent},
  {path: 'event/:eventId', component: EventDetailsComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
