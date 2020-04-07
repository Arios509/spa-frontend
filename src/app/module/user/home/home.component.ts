import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/core/_services/customer.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent  {


  constructor(private _authService: AuthService, private router: Router) { }

  logout = () => {
    this._authService.logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['login']);
      alert('Sucess logout');
    });
  }
}
