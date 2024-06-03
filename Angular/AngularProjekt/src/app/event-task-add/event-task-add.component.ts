import { Component, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventTaskRequestDTO } from '../model/event-taskRequest.interface';
import { EventTasksService } from '../event-tasks.service';

@Component({
  selector: 'app-event-task-add',
  templateUrl: './event-task-add.component.html',
  styleUrl: './event-task-add.component.css'
})
export class EventTaskAddComponent {

  eventId: number = -1;

  constructor(private route: ActivatedRoute, private router: Router) {
    const eventId = route.snapshot.paramMap.get('eventId');
    if(eventId!=null) this.eventId = parseInt(eventId);
    this.eventTaskRequest = {
      eventId: this.eventId,
      body: '',
      deadline: '',
      isFinished: false
    }
   }

  public eventTaskRequest: EventTaskRequestDTO;

  readonly api = inject(EventTasksService);

  public onSubmit(event: any): void {
    if (this.eventId != -1) {
      this.api.addTask(1, this.eventTaskRequest).subscribe({
        next: () => {
          this.router.navigate(['/event/', this.eventId]);
        },
        error: (err) => console.log(err)
      })
    }
  }

  public cancel(): void{
    console.log(this.eventTaskRequest);
    this.eventTaskRequest = {
      eventId: -1,
      body: '',
      deadline: '',
      isFinished: false
    };
  }
}
