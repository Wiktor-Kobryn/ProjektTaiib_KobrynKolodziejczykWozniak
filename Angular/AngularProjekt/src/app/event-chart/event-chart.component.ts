import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventCommon } from '../events-common/event-common';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { EventTasksService } from '../event-tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../comment.service';
import { EventsService } from '../events.service';
import { GroupsService } from '../groups.service';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
} from 'ng-apexcharts';
import { EventTaskResponseDTO } from '../model/event-task.interface';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-event-chart',
  templateUrl: './event-chart.component.html',
  styleUrl: './event-chart.component.css'
})
export class EventChartComponent extends EventCommon implements OnInit{
  public chartOptions!: ChartOptions;

  constructor(private dateAdapter: DateAdapter<Date>, route: ActivatedRoute, userService: UserService, eventTasksService: EventTasksService,
    groupService: GroupsService, eventService: EventsService, commentService: CommentService, router: Router, dialog: MatDialog, cdr: ChangeDetectorRef) {
    super(route,userService, eventTasksService, groupService, eventService,commentService,router,dialog,cdr);

    this.createEventTaskChart();
  }

  ngOnInit(): void {
    this.startTimer()
    this.createEventTaskChart();
  }

  // timer - to assure that data to the chart will load 
  public startTimer(): void {
    setTimeout(() => {
      this.onTimerComplete();
    }, 3000);
  }

  public onTimerComplete(): void {
    console.log('Timer completed!');
    this.createEventTaskChart();
  }

  public setupPieChart(): void {
    let data: number[] = [];
    let dataLabels: string[] = [];

    for(let i = 0; i < this.eventTasks.length; i++) {
      data[i] = this.getTaskContributorsCount(this.eventTasks[i]);
      dataLabels[i] = this.eventTasks[i].body;
    }

    this.chartOptions = {
      series: data,
      chart: {
        width: 500,
        type: 'pie'
      },
      labels: dataLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  public createEventTaskChart(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if (eventId !== null) {
      this.eventTasksService.getEventEventTasks(parseInt(eventId)).subscribe({
        next: (res) => {
          this.eventTasks = res;
          this.setupPieChart();
        },
        error: (err) => console.log(err)
      });
    }
  }

  public getTaskContributorsCount(eventTask: EventTaskResponseDTO): number {
    let taskContributors = this.eventTaskContributors.get(eventTask.id); 

    let count = taskContributors?.length ?? 1;
    // not the best solution but every task has a contrubutor so they cannot vote
    return count - 1;
  }

  public checkIfUserCanVote(eventTask: EventTaskResponseDTO): boolean {
    let taskContributors = this.eventTaskContributors.get(eventTask.id); 
    
    if(taskContributors == undefined)
      return false;
    else {
      for(let tc of taskContributors) {
        if(tc.id == this.user.id) {
          return false;
        }
      }
      
      return true;
    }
  }

  public voteEventTask(eventTask: EventTaskResponseDTO): void {
    if(eventTask != null && eventTask != undefined && eventTask.id != null) {
      this.eventTasksService.addUserToEventTask(this.user.id, eventTask.id).subscribe({
        next: () => {
          this.loadEventData();
          this.createEventTaskChart();
          this.startTimer();
        }
      })
    }
  }
}
