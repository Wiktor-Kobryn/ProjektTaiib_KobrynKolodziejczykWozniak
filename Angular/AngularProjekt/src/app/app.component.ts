import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserResponseDTO } from './model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularProjekt';
  user!: UserResponseDTO;
  public isLoggedIn: boolean = false;

  public readonly apiToken = inject(TokenService);
  private readonly apiUser = inject(UserService);
  private readonly jwtHelper = inject(JwtHelperService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isUserAuthenticated()) {
      this.router.navigate(["/login"]);
    } else {
      
    }
  }

  
  isUserAuthenticated(): boolean {
    const token: string | null = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token) && token != "") {
      this.isLoggedIn = true;
      this.apiToken.setToken(token);
      return true;
    }
    return false;
  }
  logOut(): void {
    localStorage.removeItem("jwt");
    this.apiToken.setToken("");
    this.isLoggedIn =false;
    this.router.navigate(["/login"]);
  }
}