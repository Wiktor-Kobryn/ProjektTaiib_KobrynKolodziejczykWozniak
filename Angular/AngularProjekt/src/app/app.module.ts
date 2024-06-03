import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventTaskAddComponent } from './event-task-add/event-task-add.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventDetailsComponent,
    EventTaskAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
