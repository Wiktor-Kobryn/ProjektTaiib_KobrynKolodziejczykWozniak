import { ChangeDetectorRef, Directive } from "@angular/core";
import { EventResponseDTO } from "../model/event.interface";
import { EventTaskResponseDTO } from "../model/event-task.interface";
import { CommentResponseDTO } from "../model/comment.interface";
import { UserResponseDTO } from "../model/user.interface";
import { GroupResponseDTO } from "../model/group.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { EventTasksService } from "../event-tasks.service";
import { CommentService } from "../comment.service";
import { EventsService } from "../events.service";
import { GroupsService } from "../groups.service";
import { EventTaskContributorAddDialogComponent } from "../event-task-contributor-add-dialog/event-task-contributor-add-dialog.component";
import { CommentRequestDTO } from "../model/commentRequest.interface";
import { MatDialog } from "@angular/material/dialog";
import { EventType } from "../model/eventType.interface";
import { EventTaskAddComponent } from "../event-task-add/event-task-add.component";
import { Subscription } from "rxjs";
import { GroupAddDialogComponent } from "../group-add-dialog/group-add-dialog.component";


@Directive()
export abstract class EventCommon {
  public event!: EventResponseDTO;
  public eventTasks: EventTaskResponseDTO[] = [];
  public commentsMap = new Map<number, CommentResponseDTO[]>();
  public eventTaskContributors = new Map<number, UserResponseDTO[]>();
  public creator!: UserResponseDTO;
  public creatorFriends: UserResponseDTO[] = [];
  public group: GroupResponseDTO | null = null;
  public contributors: UserResponseDTO[] = [];
  public isCommentIconClicked: boolean = false;
  public choosedId: number = -1;
  public isEditorMode: boolean = false;
  commentText: string = '';
  private commentSubscription!: Subscription;
  public currentUser: number = 1;     ///do zmiany!!!!!!!!!!!!!!!!!!!1

  constructor(protected route: ActivatedRoute, protected userService: UserService, protected eventTasksService: EventTasksService,
    protected groupService: GroupsService, protected eventService: EventsService, protected commentService: CommentService, protected router: Router, protected dialog: MatDialog, protected cdr: ChangeDetectorRef) {
    const eventId = route.snapshot.paramMap.get('eventId');
    if (eventId !== null) {
      eventTasksService.getEventEventTasks(parseInt(eventId)).subscribe({
        next: (res) => {
          this.eventTasks = res;
          this.getEventTaskContributors();
          this.getComments();
          this.getEvent(parseInt(eventId));
          this.getCreator(parseInt(eventId));
          this.getGroup(parseInt(eventId));
        },
        error: (err) => console.log(err)
      });
    }

  }

  ngOnInit() {
    this.commentSubscription = this.eventTasksService.comments$.subscribe(comments => {
      if (this.choosedId !== -1) {
        this.commentsMap.set(this.choosedId, comments);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

  public getEvent(eventId: number): void {
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
        if (res != null) {
          this.group = res
          this.getContributors(res.id);
        }
      },
      error: (err) => err
    });
  }

  public getCreator(eventId: number): void {
    this.userService.getUserByEvent(eventId).subscribe({
      next: (res) => {
        this.creator = res;
        this.isCreator();
        if (this.group == undefined) {
          this.contributors.push(this.creator);
        }
        this.getCreatorFriends(res.id);
      },
      error: (err) => console.log(err)
    });
  }

  private getCreatorFriends(id: number) {
    this.userService.getUserFriends(id).subscribe({
      next: (res) => {
        this.creatorFriends = res;
      },
      error: (err) => console.log('Error fetching users friends: ', err)
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
    if (this.currentUser == this.creator.id) {
      return true;
    }
    else return false;
  }

  public getUserAvatar(userId: number): string | undefined {
    return this.contributors.find(c => c.id == userId)?.image;
  }

  public addContributorToTask(eventTaskId: number): void {
    var x = this.dialog.open(EventTaskContributorAddDialogComponent, {
      data: this.contributors
    });
    x.afterClosed().subscribe(
      res => {
        if (res != null) {
          console.log(res);
          this.eventTasksService.addUserToEventTask(res, eventTaskId).subscribe({
            next: () => {
              this.eventTasksService.getEventEventTasks(this.event.id).subscribe({
                next: (res) => {
                  this.eventTasks = res;
                  this.getEventTaskContributors();
                  this.getComments();
                },
                error: (err) => console.log(err)
              })
            }
          }
          )
        }
      })
  }

  public addTask(): void {
    var x = this.dialog.open(EventTaskAddComponent, {
      data: this.event.id
    });
    x.afterClosed().subscribe(
      res => {
        if (res != null) {
          console.log(res);
          this.eventTasksService.addTask(this.currentUser, res).subscribe({
            next: () => {
              this.eventTasksService.getEventEventTasks(this.event.id).subscribe({
                next: (res) => {
                  this.eventTasks = res;
                  this.getEventTaskContributors();
                  this.getComments();
                },
                error: (err) => console.log(err)
              });
              this.cdr.detectChanges();
            },
            error: (err) => console.log(err)
          })
        }
      }
    )
  }

  public isOverDeadline(event: EventTaskResponseDTO): boolean {
    if (event.isFinished) return false;
    const currentTime = new Date();
    const deadline = new Date(event.deadline);
    return deadline.getTime() < currentTime.getTime();
  }

  public showCommentInput(eventTaskId: number): void {
    this.isCommentIconClicked = !this.isCommentIconClicked;
    this.choosedId = eventTaskId;
  }
  public commentRequest!: CommentRequestDTO;

  public addCommentToTask(eventTaskId: number, commentText: string): void {
    console.log(this.commentText);
    if (this.commentText != '') {
      this.commentRequest = {
        userId: this.currentUser,
        eventTaskId: eventTaskId,
        body: this.commentText
      }

      this.commentService.add(this.commentRequest).subscribe({
        next: () => {
          this.eventTasksService.loadComments(eventTaskId);
        }
      })
    }
  }



  public summary(): number[] {
    var numbers: number[] = [0, 0, 0];
    this.eventTasks.forEach(event => {
      if (event.isFinished) numbers[1]++;
      else {
        if (this.isOverDeadline(event)) numbers[2]++;
        else numbers[0]++;
      }
    });
    return numbers;
  }

  public toggleMode(): void {
    if (this.isCreator())
      this.isEditorMode = !this.isEditorMode;
  }

  public finishTask(eventTaskId: number) {
    this.eventTasksService.changeFinishState(eventTaskId).subscribe({
      next: () => {
        const task = this.eventTasks.find(t => t.id === eventTaskId);
        if (task) {
          task.isFinished = !task.isFinished;
        }
        this.cdr.detectChanges();
      }
    })
  }

  public addContributorButton(): void {
    if (this.contributors.length == 1 && this.group == null)
      this.addGroup(); 
    else if (this.contributors.length >= 1)
      this.addContributor();
  }

  public addGroup(): void {
    var x = this.dialog.open(GroupAddDialogComponent, {
      data: this.event.id
    });
    x.afterClosed().subscribe(
      res => {
        if (res != null) {
          console.log(res);
          this.groupService.addGroup(res, this.creator.id).subscribe({
            next: () => {
              this.eventTasksService.getEventEventTasks(this.event.id).subscribe({
                next: () => {
                  this.getGroup(this.event.id);
                  this.addContributor()
                }
              })
            },
            error: (err) => console.log(err)
          })
        }
      }
    )

  }

  public addContributor(): void {
    var x = this.dialog.open(EventTaskContributorAddDialogComponent, {
      data: this.creatorFriends
    });
    x.afterClosed().subscribe(
      res => {
        if (res != null) {
          if (this.group != null)
            this.groupService.addUserToGroup(res, this.group?.id).subscribe({
              next: () => {
                this.eventService.getEvent(this.event.id).subscribe({
                  next: () => {
                    this.getGroup(this.event.id);
                  },
                  error: (err) => console.log(err)
                })
              }
            }
            )
        }
      })
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
}
