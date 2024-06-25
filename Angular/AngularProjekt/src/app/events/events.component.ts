import { Component, OnInit, inject } from '@angular/core';
import { EventsService } from '../events.service';
import { Route, Router } from '@angular/router';
import { EventResponseDTO } from '../model/event.interface';
import { GroupsService } from '../groups.service';
import { GroupResponseDTO } from '../model/group.interface';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { EventType } from '../model/eventType.interface';
import { EventRequestDTO } from '../model/eventRequest.interface';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
    //ZMIENIC POTEM JEDYNKI NA USERID POBRANE Z AUTORYZACJI
    public currentUser: number = 1004;
    public events: EventResponseDTO[] = [];
    public eventSizeOfContributors = new Map<EventResponseDTO, number>();
    public eventCreators = new Map<EventResponseDTO, number>();
    public eventRequest: EventRequestDTO = {
      title: "",
      userId: this.currentUser,
      type: EventType.activity
    }
  
    constructor(private eventsService: EventsService, private router: Router,  private apiToken: TokenService) {
      if(this.apiToken.getToken()=="") this.router.navigateByUrl("login");
      this.currentUser = this.apiToken.decode();
      console.log("ID" + this.currentUser);
      this.eventRequest.userId=this.currentUser;
      
      }

    ngOnInit(): void {
      this.getEvents();
      console.log(this.events);
    }
  
    private readonly groupsApi = inject(GroupsService);
  
    public onPaginationSubmit(): void {
      this.getEvents();
    }
  
    private getEvents(): void {
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
        this.getContributorsSize();
      });
      
    }
  
    private getEventsByUser(): Observable<EventResponseDTO[]> {
      return this.eventsService.getUserEvents(this.currentUser);
    }
  
    private getEventsByGroup(): Observable<EventResponseDTO[]> {
      return this.groupsApi.getUserGroups(this.currentUser).pipe(
        switchMap((groups: GroupResponseDTO[]) => {
          if (!groups || groups.length === 0) {
            // Jeśli użytkownik nie należy do żadnych grup, zwróć pustą tablicę
            return of([]);
          } else {
            const observables: Observable<EventResponseDTO[]>[] = [];
            groups.forEach(group => {
              observables.push(this.eventsService.getGroupEvents(group.id).pipe(
                map(event => [event])
              ));
            });
            return forkJoin(observables);
          }
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
  
    public onSubmit(): void {
      this.eventRequest.type = parseInt(this.eventRequest.type.toString());
      this.eventsService.add(this.eventRequest).subscribe({
        next: () => {
          this.onPaginationSubmit();
        },
        error: (err) => console.log(err)
      })
    }
  
    public navigateToDetails(eventId: number, eventType: string): void {
      this.router.navigate(['/event/'+eventType, eventId]);
    }
  
    public isOwner(eventId: number, userId: number): boolean {
      var x = this.events.find(e => e.id == eventId);
      if (x?.userId == userId) return true;
      else return false;
    }
  
    public removeEvent(eventId: number): void {
      this.eventsService.delete(eventId).subscribe({
        next: () => {
          this.getEvents();
        },
        error: (err) => console.log(err)
      });
    }
  
    public getContributorsSize(): void {
      this.events.forEach(event => {
        this.eventSizeOfContributors.set(event, 1);
        this.eventsService.getContributorsSize(event.id).subscribe({
          next: (res) => {
            this.eventSizeOfContributors.set(event, res);
          },
          error: (err) => console.log(err)
        });
      });
    }
  }