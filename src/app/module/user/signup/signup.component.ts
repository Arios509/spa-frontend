import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/core/_helpers/must-match';
import { AuthService } from 'src/app/core/_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initialForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initialForm = () => {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]

    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  get f() { return this.registerForm.controls; }
  onSubmit = () => {
    this.subscriptions.push(
      this._authService.registerUser(this.f.username.value, this.f.password.value).subscribe(res => {
        alert('Register account success');
        this.router.navigate(['login']);
      }, error => {
        alert(error.error.message);
      }));
  }
}
