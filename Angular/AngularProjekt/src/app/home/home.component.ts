import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly apiToken = inject(TokenService);

    ngOnInit(): void {
      if(this.apiToken.getToken()=="") this.router.navigateByUrl("login");
    }
    constructor(private router: Router){
      
    }

}
