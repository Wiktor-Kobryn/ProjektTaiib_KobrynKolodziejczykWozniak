import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  firstTimeLogin: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' && this.firstTimeLogin) {
          location.reload();
          this.firstTimeLogin = false;
        }
      }
    });
  }

  login(form: NgForm) {
    const credentials = JSON.stringify({
      username: form.value.login,
      password: form.value.password
    });

    this.http.post("http://localhost:5171/api/Auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      console.log("Token received:", token);
      localStorage.setItem("jwt", token.toString());  
      this.invalidLogin = false;
      console.log("Logged");
    }, err => {
      this.invalidLogin = true;  // Show invalid login message on error
    });
    if(!this.invalidLogin)
    this.router.navigate(["/profile"]);  

  }

  signUp() {
    this.router.navigate(["/signup"]);  // Navigate to sign-up page
  }
}
