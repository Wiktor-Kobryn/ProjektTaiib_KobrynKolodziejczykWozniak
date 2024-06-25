import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserResponseDTO } from '../model/user.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: UserResponseDTO[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(1).subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Error fetching users:', err)
    });
  }
}
