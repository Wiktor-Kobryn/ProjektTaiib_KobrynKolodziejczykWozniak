import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { UserResponseDTO } from './model/user.interface';
import { P } from '@angular/cdk/keycodes';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProjekt';
  user!: UserResponseDTO;

  constructor(private apiUser: UserService, private jwtHelper: JwtHelperService) {
    this.apiUser.getUser(1).subscribe({
      next: (res) => {
        this.user = res;
      }
    })
  }
 public readonly apiToken = inject(TokenService);

  

  isUserAuthenticated() {
    const token: string | null = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      this.apiToken.setToken(token);
      return true;
    }
    else{
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

}
