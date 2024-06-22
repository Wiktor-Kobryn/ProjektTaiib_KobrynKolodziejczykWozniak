import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserResponseDTO } from '../model/user.interface';
import { UserRequestDTO } from '../model/userRequest.interface';

@Component({
  selector: 'app-user-change-dialog',
  templateUrl: './user-change-dialog.component.html',
  styleUrl: './user-change-dialog.component.css'
})
export class UserChangeDialogComponent {
  public userRequest!: UserRequestDTO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserResponseDTO) {
    this.userRequest = { login: '', name: '', image: '', isAdmin: true, password: '---'};
    this.userRequest.image = data.image;
    this.userRequest.name = data.name;
    this.userRequest.login = data.login;
  }
}
