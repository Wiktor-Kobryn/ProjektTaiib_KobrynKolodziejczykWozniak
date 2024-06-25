import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserResponseDTO } from '../model/user.interface';
import { EventResponseDTO } from '../model/event.interface';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: UserResponseDTO[] = [];
  usersCreatedInLastWeek: UserResponseDTO[] = [];
  liczbauserow: number = 0;
  listyTasks: EventResponseDTO[] = [];
  eventsCreatedLastWeek: EventResponseDTO[] = [];
  liczbaTask: number =0;
  constructor(private userService: UserService, private eventService: EventsService) { }

  ngOnInit(): void {
    this.userService.getUsers(1).subscribe({
      next: (users) => {
        this.users = users;
        this.liczbauserow = users.length;
        this.usersCreatedInLastWeek = this.filterUsersByLastWeek(users);

        users.forEach(user => {
          this.eventService.getUserEvents(user.id).subscribe({
            next: (events) => {
              events.forEach(event => {
                this.listyTasks.push(event);
                if (this.isEventCreatedLastWeek(event)) {
                  this.eventsCreatedLastWeek.push(event);
                  this.liczbaTask = this.eventsCreatedLastWeek.length;

                }
              });
            },
            error: (err) => console.error(`Błąd pobierania wydarzeń użytkownika o ID ${user.id}:`, err)
          });
        });
      },
      error: (err) => console.error('Błąd pobierania użytkowników:', err)
    });
  }

  private filterUsersByLastWeek(users: UserResponseDTO[]): UserResponseDTO[] {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return users.filter(user => {
      const creationDate = new Date(user.creationDate);
      return creationDate >= oneWeekAgo;
    });
  }

  private isEventCreatedLastWeek(event: EventResponseDTO): boolean {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const eventDate = new Date(event.creationDate);
    
    return eventDate >= oneWeekAgo;
  }
}
