import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/core/_services/customer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private _customerService: CustomerService, private router: Router) { }


  ngOnInit(): void {
    this.initialForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }

  // Initial form
  initialForm = () => {
    this.customerForm = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      joineddate: ['', [Validators.required]]
    });
  }

  get f() { return this.customerForm.controls; }
  onSubmit = () => {

    const form = {
      lastname: this.f.lastname.value,
      firstname: this.f.firstname.value,
      company: this.f.company.value,
      address: this.f.address.value,
      city: this.f.city.value,
      postcode: this.f.postcode.value,
      country: this.f.country.value,
      joineddate: this.f.joineddate.value
    };
    this.subscriptions.push(
      this._customerService.createCustomer(form).subscribe((res) => {
        alert('Sucess');
        this.router.navigate(['main/home']);
      })
    )
  }
}
