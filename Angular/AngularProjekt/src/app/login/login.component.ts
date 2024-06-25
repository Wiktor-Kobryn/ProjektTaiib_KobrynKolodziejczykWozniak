import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from '../app.component';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  firstTimeLogin: boolean = true;

  constructor(private apiToken: TokenService,private http: HttpClient, private router: Router, private app: AppComponent) { }

  ngOnInit(): void {
    localStorage.removeItem("jwt");
    this.apiToken.setToken("");
    console.log(this.apiToken);
    console.log("Usuwam JWT"+  localStorage.getItem("jwt"));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' && this.firstTimeLogin) {
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
    }).subscribe( { 
      next: (res)  =>{
      const token = (<any>res).token;
      console.log("Token received:", token);
      localStorage.setItem("jwt", token.toString());  
      this.invalidLogin = false;
      this.app.isLoggedIn = true;
     // console.log("Logged");
     this.apiToken.setToken(token);
     
      if(!this.invalidLogin)
      this.router.navigate(["/profile"]); 
    }
  }
  
    );
 

  }

  signUp() {
    this.router.navigate(["/signup"]);  // Navigate to sign-up page
  }
}
