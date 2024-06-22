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


@Directive()
export abstract class EventCommon {
  public event!: EventResponseDTO;
  public eventTasks: EventTaskResponseDTO[] = [];
  public commentsMap = new Map<number, CommentResponseDTO[]>();
  public eventTaskContributors = new Map<number, UserResponseDTO[]>();
  public creator!: UserResponseDTO;
  public group!: GroupResponseDTO;
  public contributors: UserResponseDTO[] = [];
  public isCommentIconClicked: boolean = false;
  public choosedId: number = -1;
  public isEditorMode: boolean = false;
  commentText: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private eventTasksService: EventTasksService,
    private groupService: GroupsService, private eventService: EventsService, private commentService: CommentService, private router: Router, private dialog: MatDialog, private cdr: ChangeDetectorRef) {
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
        if(this.group==undefined){
          this.contributors.push(this.creator);
        }
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
    if (1 == this.creator.id) {
      this.isEditorMode = true;
      return true;
    }
    else return false;
  }

  public getUserAvatar(userId: number): string | undefined {
    return this.contributors.find(c => c.id == userId)?.image;
  }

  public addContributorToTask(eventTaskId: number, eventTaskTitle: string): void {
    var x = this.dialog.open(EventTaskContributorAddDialogComponent, {
      data: this.contributors
    });
    x.afterClosed().subscribe(
      res => {
        if (res != null) {
          console.log(res);
          this.eventTasksService.addUserToEventTask(res, eventTaskId).subscribe({
            next: () => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/event/', this.event.id]);
              })
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
        userId: 1,
        eventTaskId: eventTaskId,
        body: this.commentText
      }

      this.commentService.add(this.commentRequest).subscribe({
        next: () => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/event/', this.event.id]);
          })
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
    this.isEditorMode = !this.isEditorMode;
  }

  public finishTask(eventTaskId: number) {
    this.eventTasksService.changeFinishState(eventTaskId).subscribe({
      next: () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/event/', this.event.id]);
        })
      }
    })
  }

  public addContributor(): void {

  }

  public addTask() {
    this.router.navigate(['event/eventTask/add', this.event.id]);
  }

}
