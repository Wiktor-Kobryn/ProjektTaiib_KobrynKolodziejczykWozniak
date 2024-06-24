import { ChangeDetectorRef, Component } from '@angular/core';
import { EventCommon } from '../events-common/event-common';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../comment.service';
import { EventTasksService } from '../event-tasks.service';
import { EventsService } from '../events.service';
import { GroupsService } from '../groups.service';
import { UserService } from '../user.service';
import { EventTaskAddComponent } from '../event-task-add/event-task-add.component';
import { EventTaskResponseDTO } from '../model/event-task.interface';
import { EventTaskActivityAddComponent } from '../event-task-activity-add/event-task-activity-add.component';

@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrl: './event-activity.component.css'
})
export class EventActivityComponent extends EventCommon{
  currentMonth: Date;
  weeks: (Date|null) [][];
  public dayTaskMap = new Map<Date, EventTaskResponseDTO>();
  choosedEvent!: EventTaskResponseDTO;

  constructor(private dateAdapter: DateAdapter<Date>, route: ActivatedRoute, userService: UserService, eventTasksService: EventTasksService,
    groupService: GroupsService, eventService: EventsService, commentService: CommentService, router: Router, dialog: MatDialog, cdr: ChangeDetectorRef) {
    super(route,userService, eventTasksService, groupService, eventService,commentService,router,dialog,cdr);
    this.currentMonth = new Date();
    this.weeks = [];
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.weeks=[];

    const startOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const endOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    let currentDate = startOfMonth;
    let startDay = startOfMonth.getDay();
    startDay = startDay === 0 ? 7 : startDay; 

    
    const week: (Date | null)[] = [];
    for (let i = 1; i < startDay; i++) {
        week.push(null);
    }

    while (currentDate <= endOfMonth) {
        week.push(new Date(currentDate));
        currentDate = this.dateAdapter.addCalendarDays(currentDate, 1);
        if (week.length === 7) {
            this.weeks.push(week.slice());
            week.length = 0; 
        }
    }

    
    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null);
        }
        this.weeks.push(week);
    }
  }

  isSameMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth();
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }

  isDone(date: Date | null): boolean {
    for (const activity of this.eventTasks) {
      const deadline = new Date(activity.deadline);
      if (deadline.getDate() === (date?.getDate()) && deadline.getMonth()=== (date?.getMonth()) && deadline.getFullYear() === (date.getFullYear())) {
        return true;
      }
    }
    return false;
  }
  
  
  public addActivity(date: Date | null): void {
    if(date!=null){
      var x = this.dialog.open(EventTaskActivityAddComponent, {
        data: { eventId: this.event.id, date: date}
      });
      
      x.afterClosed().subscribe(
        res => {
          if (res != null) {
            console.log(res);
            this.eventTasksService.addTask(1, res).subscribe({
              next: () => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/event/'+this.getEventTypeText(this.event.type), this.event.id]);
                })
              },
              error: (err) => console.log(err)
            })
          }
        }
      )
    }
  }

  public showDescription(event: Event, date: Date | null): void
  {
    event.stopPropagation();
    this.isCommentIconClicked = true;
    this.eventTasks.forEach(activity => {
      const deadline = new Date(activity.deadline);
      if (deadline.getDate() === (date?.getDate()) && deadline.getMonth() === (date?.getMonth()) && deadline.getFullYear() === (date.getFullYear())) {
        this.choosedEvent = activity;
      }
    });
    
  }

}
