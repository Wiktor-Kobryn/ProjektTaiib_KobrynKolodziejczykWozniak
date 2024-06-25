import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  login: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      login: this.login,
      password: this.password,
      name: this.login,
      image: "crabV1.jpg",
      isAdmin: false,
      Date:  new Date().toISOString()
    };

    this.http.post('http://localhost:5171/api/Users', user)
      .subscribe(response => {
        console.log('User created successfully', response);
        alert('User created successfully');
        this.router.navigate(["/login"]);
      }, error => {
        console.error('Error creating user', error);
        alert('Error creating user');
      });
  }
}
