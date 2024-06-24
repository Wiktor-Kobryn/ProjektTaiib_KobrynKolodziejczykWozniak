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
  // Component logic here
  constructor(private http: HttpClient, private router: Router) {}

  login(form: NgForm) {
  const credentials = JSON.stringify(form.value);
  this.http.post("http://localhost:5171/api/Auth/login ", credentials, {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }).subscribe(response => {
    const token = (<any>response).token;
    localStorage.setItem("jwt", token);
    this.invalidLogin = false;
    this.router.navigate(["/"]);
  }, err => {
    this.invalidLogin = true;
  });
  }
  }

  signUp() {
    // Logic for handling sign-up can be added here
  }
}
