import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserResponseDTO } from '../model/user.interface';

@Component({
  selector: 'app-event-task-contributor-add-dialog',
  templateUrl: './event-task-contributor-add-dialog.component.html',
  styleUrl: './event-task-contributor-add-dialog.component.css',
})


export class EventTaskContributorAddDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserResponseDTO[]) {}

}
