import { Component, inject } from '@angular/core';
import { EventsService } from '../events.service';
import { Route, Router } from '@angular/router';
import { EventResponseDTO} from '../model/event.interface';
import { GroupsService } from '../groups.service';
import { GroupResponseDTO } from '../model/group.interface';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { EventType } from '../model/eventType.interface';
import { EventRequestDTO } from '../model/eventRequest.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
   //ZMIENIC POTEM JEDYNKI NA USERID POBRANE Z AUTORYZACJI

  public events: EventResponseDTO[] = [];

  public eventRequest: EventRequestDTO = {
    title: "",
    userId: 1,
    type: EventType.activity
  }

  constructor(private eventsService: EventsService, private router: Router) {
    this.getEvents();
  }

  private readonly groupsApi = inject(GroupsService);

  public onPaginationSubmit(): void {
    this.getEvents();
  }

  private getEvents(): void{
    forkJoin([
      this.getEventsByUser(),
      this.getEventsByGroup()
  ]).subscribe(([userEvents, groupEvents]) => {
      const eventsMap = new Map<number, EventResponseDTO>();
      userEvents.forEach(event => {
          eventsMap.set(event.id, event);
      });
      groupEvents.forEach(event => {
          if (!eventsMap.has(event.id)) {
              eventsMap.set(event.id, event);
          }
      });
      this.events = Array.from(eventsMap.values());
      console.log(this.events); 
  });
  }

  private getEventsByUser(): Observable<EventResponseDTO[]> {
    return this.eventsService.getUserEvents(1);
  }

  private getEventsByGroup(): Observable<EventResponseDTO[]> {
    return this.groupsApi.getUserGroups(1).pipe(
      switchMap((groups: GroupResponseDTO[]) => {
          const observables: Observable<EventResponseDTO[]>[] = [];
          groups.forEach(group => {
              observables.push(this.eventsService.getGroupEvents(group.id).pipe(
                  map(event => [event])
              ));
          });
          return forkJoin(observables);
      }),
      map((eventsArray: EventResponseDTO[][]) => {
          return eventsArray.reduce((acc, curr) => acc.concat(curr), []);
      })
  );
  }

  public getEventTypeText(eventType: EventType): string {
    switch (eventType) {
      case EventType.chart:
        return 'Chart';
      case EventType.task:
        return 'Task';
      case EventType.activity:
        return 'Activity';
      default:
        return '';
    }
  }

  public onSubmit(): void{
    this.eventRequest.type = parseInt(this.eventRequest.type.toString());
    this.eventsService.add(this.eventRequest).subscribe({
      next: () => {
          this.onPaginationSubmit();
      },
      error: (err) => console.log(err)
    })
  }
}
