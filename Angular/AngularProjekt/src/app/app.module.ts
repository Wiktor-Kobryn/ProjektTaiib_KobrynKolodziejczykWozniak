import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EventTaskComponent } from './event-task/event-task.component';
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
import { EventActivityComponent } from './event-activity/event-activity.component';
import { MatNativeDateModule } from '@angular/material/core';
import { EventTaskActivityAddComponent } from './event-task-activity-add/event-task-activity-add.component';
import { FriendsAddComponent } from './friends-add/friends-add.component';
import { UserChangeDialogComponent } from './user-change-dialog/user-change-dialog.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EventChartComponent } from './event-chart/event-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventTaskComponent,
    EventTaskAddComponent,
    EventTaskContributorAddDialogComponent,
    ProfileComponent,
    EventActivityComponent,
    EventTaskActivityAddComponent,
    FriendsAddComponent,
    UserChangeDialogComponent,
    AdminPanelComponent,
    HomeComponent,
    LoginComponent,
    EventChartComponent
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
    MatSelectModule,
    MatNativeDateModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
