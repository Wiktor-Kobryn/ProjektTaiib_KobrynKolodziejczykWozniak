import { Component, Input, inject } from '@angular/core';
import { EventTasksService } from '../event-tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventTaskResponseDTO } from '../model/event-task.interface';
import { CommentResponseDTO } from '../model/comment.interface';
import { EventResponseDTO } from '../model/event.interface';
import { UserService } from '../user.service';
import { UserResponseDTO } from '../model/user.interface';
import { GroupsService } from '../groups.service';
import { GroupResponseDTO } from '../model/group.interface';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  public event!: EventResponseDTO ;
  public eventTasks: EventTaskResponseDTO[] = [];
  public commentsMap = new Map<number, CommentResponseDTO[]>();
  public eventTaskContributors = new Map<number, UserResponseDTO[]>();
  public creator!: UserResponseDTO;
  public group!: GroupResponseDTO;
  public contributors: UserResponseDTO[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private eventTasksService: EventTasksService,
    private groupService: GroupsService, private eventService: EventsService, private router: Router) {
    const eventId = route.snapshot.paramMap.get('eventId');
    if (eventId !== null) {
      eventTasksService.getEventEventTasks(parseInt(eventId)).subscribe({
        next: (res) => {
          this.eventTasks = res;
          this.getEventTaskContributors();
          this.getComments();
          this.getEvent(parseInt(eventId));
          this.getGroup(parseInt(eventId));
          this.getCreator(parseInt(eventId));
        },
        error: (err) => console.log(err)
      });
    }
  }

  public getEvent(eventId: number): void{
    this.eventService.getEvent(eventId).subscribe({
      next: (res) => {
        this.event = res;
      },
      error: (err) => console.log(err)
    });
  }

  public getEventTaskContributors(): void {
    this.eventTasks.forEach(eventTask => {
      this.userService.getEventTaskContributors(eventTask.id).subscribe({
        next: (res) => {
          this.eventTaskContributors.set(eventTask.id, res);
        },
        error: (err) => console.log(err)
      });
    });
  }

  public getContributors(groupId: number): void {
    if (!this.group) {
      console.error("Obiekt 'group' jest niezdefiniowany.");
      return;
    }
    this.userService.getGroupUsers(groupId).subscribe({
      next: (res) => {
        this.contributors = res
      },
      error: (err) => console.log(err)
    });
  }

  public getGroup(eventId: number): void {
    this.groupService.getEventGroup(eventId).subscribe({
      next: (res) => {
        this.group = res
        this.getContributors(res.id);
      },
      error: (err) => err
    });
  }

  public getCreator(eventId: number): void {
    this.userService.getUserByEvent(eventId).subscribe({
      next: (res) => {
        this.creator = res;
      },
      error: (err) => console.log(err)
    });
  }

  public getComments(): void {
    this.eventTasks.forEach(eventTask => {
      this.eventTasksService.getEventTaskComments(eventTask.id).subscribe({
        next: (res) => {
          this.commentsMap.set(eventTask.id, res);
        },
        error: (err) => console.log(err)
      });
    });
  }

  public isCreator(): boolean {
    if (1 == this.creator.id) return true;
    else return false;
  }

  public getUserAvatar(userId: number): string | undefined {
    return this.contributors.find(c => c.id == userId)?.image;
  }

  public addContributor() {

  }

  public addTask() {
    this.router.navigate(['event/eventTask/add', this.event.id]);
  }

}
