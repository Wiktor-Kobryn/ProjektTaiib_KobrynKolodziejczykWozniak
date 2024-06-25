import { Component, inject } from '@angular/core';
import { UserResponseDTO } from '../model/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.component.html',
  styleUrl: './friends-add.component.css'
})
export class FriendsAddComponent {
  // tymczasowy użytkownik - zmienić po dodaniu JWT !!!
  public currentUserID: number = 10;
  private readonly apiToken = inject(TokenService);

  public user!: UserResponseDTO;
  public friends: UserResponseDTO[] = [];
  public nonFriends: UserResponseDTO[] = [];
  public searchName: string = "";

  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router) {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {

    //tu pobranie ID uzytkownika z tokenu JWT !!!
    this.currentUserID = this.apiToken.decode();
    if(this.currentUserID != null) {
      this.userService.getUser(this.currentUserID).subscribe({
        next: (res) => {
          this.user = res;
          this.getUserFriends();
          this.getUserNonFriends();
        },
        error: (err) => console.log('Error fetching logged user: ', err)
      });
    }
  }

  private getUserFriends(): void {
    this.userService.getUserFriends(this.currentUserID).subscribe({
      next: (res) => {
        this.friends = res;
      },
      error: (err) => console.log('Error fetching users friends: ', err)
    });
  }

  private getUserNonFriends(): void {
    this.userService.getUserNonFriends(this.currentUserID).subscribe({
      next: (res) => {
        this.nonFriends = res;
      },
      error: (err) => console.log('Error fetching users non friends: ', err)
    });
  }

  public addFriend(event: UserResponseDTO): void {
    if(event.id != null) {
      this.userService.addFriend(this.currentUserID, event.id).subscribe({
        next: () => {
          this.getUserFriends();
          this.getUserNonFriends();
          this.searchName = "";
        },
        error: (error) => {
          console.error('Error adding friend', error);
        }
      })
    }
  }

  public searchFriendsByName(): void {
    if(this.searchName == "") {
      this.getUserNonFriends();
    }
    else {
      this.userService.getUserNonFriendsByName(this.currentUserID, this.searchName).subscribe({
        next: (res) => {
          this.nonFriends = res;
        },
        error: (err) => console.log('Error fetching users non friends by name: ', err)
      });
    }
  }
}
