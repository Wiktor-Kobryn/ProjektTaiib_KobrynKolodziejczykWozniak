import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventTaskRequestDTO } from '../model/event-taskRequest.interface';
import { EventTasksService } from '../event-tasks.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-task-add',
  templateUrl: './event-task-add.component.html',
  styleUrl: './event-task-add.component.css'
})

export class EventTaskAddComponent {
  public eventTaskRequest: EventTaskRequestDTO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.eventTaskRequest = {
      eventId: data,
      body: '',
      deadline: '',
      isFinished: false
    }
  }

  bodyControl = new FormControl('', [Validators.required]);
}
