import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { EventTaskContributorAddDialogComponent } from '../event-task-contributor-add-dialog/event-task-contributor-add-dialog.component';
import { DatePipe, formatDate } from '@angular/common';
import { CommentService } from '../comment.service';
import { CommentRequestDTO } from '../model/commentRequest.interface';
import { EventCommon } from '../events-common/event-common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent extends EventCommon {
}