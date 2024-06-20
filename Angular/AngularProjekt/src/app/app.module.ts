import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventTaskAddComponent } from './event-task-add/event-task-add.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EventTaskContributorAddDialogComponent } from './event-task-contributor-add-dialog/event-task-contributor-add-dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventDetailsComponent,
    EventTaskAddComponent,
    EventTaskContributorAddDialogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
