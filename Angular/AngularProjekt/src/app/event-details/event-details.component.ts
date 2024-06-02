import { Component } from '@angular/core';
import { EventTasksService } from '../event-tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventTaskResponseDTO } from '../model/event-task.interface';
import { CommentResponseDTO } from '../model/comment.interface';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  public eventTasks: EventTaskResponseDTO[] = [];

  constructor(private route: ActivatedRoute, private eventTasksService: EventTasksService, private router: Router) {
    const eventId = route.snapshot.paramMap.get('eventId');
    if(eventId !== null) {
      eventTasksService.getEventEventTasks(parseInt(eventId)).subscribe({
        next: (res) => {
          this.eventTasks = res;
        },
        error: (err) => console.log(err)
      });
    }
  }


  // DO ZROBIENIA, NIE DZIALA JAK POWINNO (KOMENTARZE)


  public comments: CommentResponseDTO[]=[];
  public getComments(eventTaskId: number){
    this.eventTasksService.getEventTaskComments(eventTaskId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => console.log(err)
    });
  }
}
