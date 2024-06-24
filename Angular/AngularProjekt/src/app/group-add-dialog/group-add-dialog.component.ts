import { Component, Inject } from '@angular/core';
import { GroupRequestDTO } from '../model/groupRequest.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-add-dialog',
  templateUrl: './group-add-dialog.component.html',
  styleUrl: './group-add-dialog.component.css'
})
export class GroupAddDialogComponent {

  public groupRequest: GroupRequestDTO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.groupRequest = {
      eventId: data,
      name: ''
    }
  }
}
