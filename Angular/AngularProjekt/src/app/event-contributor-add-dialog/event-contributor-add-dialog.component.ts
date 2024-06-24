import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserResponseDTO } from '../model/user.interface';

@Component({
  selector: 'app-event-contributor-add-dialog',
  templateUrl: './event-contributor-add-dialog.component.html',
  styleUrl: './event-contributor-add-dialog.component.css'
})
export class EventContributorAddDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserResponseDTO[]) {}
}
