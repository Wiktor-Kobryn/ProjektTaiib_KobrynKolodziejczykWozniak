import { Component } from '@angular/core';
import { UserResponseDTO } from '../model/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { EventTasksService } from '../event-tasks.service';
import { EventTaskResponseDTO } from '../model/event-task.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // tymczasowy użytkownik - zmienić po dodaniu JWT !!!
  public currentUserID: number = 1;

  public user!: UserResponseDTO;
  public eventTasks: EventTaskResponseDTO[] = [];
  public friends: UserResponseDTO[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService,
    private eventTasksService: EventTasksService, private router: Router) {

    this.getCurrentUser();
  }

  private getCurrentUser(): void {

    //tu pobranie ID uzytkownika z tokenu JWT !!!

    if(this.currentUserID != null) {
      this.userService.getUser(this.currentUserID).subscribe({
        next: (res) => {
          this.user = res;
          this.getUserEventTasks();
          this.getUserFriends();
        },
        error: (err) => console.log('Error fetching logged user: ', err)
      });
    }
  }

  private getUserEventTasks() {
    this.eventTasksService.getUserEventTasks(this.currentUserID).subscribe({
      next: (res) => {
        this.eventTasks = res;
      },
      error: (err) => console.log('Error fetching users event tasks: ', err)
    });
  }

  private getUserFriends() {
    this.userService.getUserFriends(this.currentUserID).subscribe({
      next: (res) => {
        this.friends = res;
      },
      error: (err) => console.log('Error fetching users event tasks: ', err)
    });
  }

  public navigateToAdminPanel(): void {
    // redirect
  }

  public navigateToAddFriend(): void {
    // redirect
  }

}
