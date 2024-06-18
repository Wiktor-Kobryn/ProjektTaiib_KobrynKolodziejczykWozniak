import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { UserResponseDTO } from './model/user.interface';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProjekt';
  user!: UserResponseDTO;

  constructor(private apiUser: UserService) {
    this.apiUser.getUser(1).subscribe({
      next: (res) => {
        this.user = res;
      }
    })
  }


}
