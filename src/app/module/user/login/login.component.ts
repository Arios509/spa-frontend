import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder, private _authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initialForm();
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  // Initial form
  initialForm = () => {
    console.log('test');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Return shorter form

  get f() { return this.loginForm.controls; }

  // Login submit
  onSubmit =  () => {

    this.subscriptions.push(
       this._authService.loginUser(this.f.username.value, this.f.password.value).subscribe( async (res) => {
        await this.router.navigate(['main/home']);
      }));
  }
}
