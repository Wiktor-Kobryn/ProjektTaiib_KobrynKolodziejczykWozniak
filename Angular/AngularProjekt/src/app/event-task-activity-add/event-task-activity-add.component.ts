import { Component, Inject } from '@angular/core';
import { EventTaskRequestDTO } from '../model/event-taskRequest.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-task-activity-add',
  templateUrl: './event-task-activity-add.component.html',
  styleUrl: './event-task-activity-add.component.css'
})
export class EventTaskActivityAddComponent {
  public eventTaskRequest: EventTaskRequestDTO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { eventId: number, date: Date}) {
    const dateClicked = data.date;
    dateClicked.setHours(23, 59, 59, 999);
    this.eventTaskRequest = {
      eventId: data.eventId,
      body: '',
      deadline: dateClicked.toISOString().slice(0, 19),
      isFinished: true
    }
  }
}
