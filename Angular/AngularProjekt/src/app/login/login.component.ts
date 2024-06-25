import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(form: NgForm) {
    const credentials = JSON.stringify({
      username: form.value.login,
      password: form.value.password
    });
    console.log(form.value);
    this.http.post("http://localhost:5171/api/Auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);  // Store JWT token in local storage
      this.invalidLogin = false;
      console.log("Logged");
      this.router.navigate(["/profile"]);  // Navigate to home or dashboard upon successful login
    }, err => {
      this.invalidLogin = true;  // Show invalid login message on error
    });
  }

  signUp() {
    this.router.navigate(["/signup"]);  // Navigate to sign-up page
  }
}
