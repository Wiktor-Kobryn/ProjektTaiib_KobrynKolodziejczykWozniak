import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { UserResponseDTO } from './model/user.interface';
import { P } from '@angular/cdk/keycodes';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProjekt';
  user!: UserResponseDTO;
    public readonly apiToken = inject(TokenService);
    private readonly apiUser = inject(UserService);
    private readonly jwtHelper = inject(JwtHelperService);
    
    constructor(private router: Router) {
      // Check if the user is authenticated on component initialization
      if (this.isUserAuthenticated()) {
        //this.apiUser.getUser(1).subscribe({
       //   next: (res) => {
         //   this.user = res;
        //  }
       // });
      }
    }

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
    location.reload();
    this.router.navigate(["/login"]);  // Navigate to sign-up page

  }

}
