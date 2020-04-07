import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/core/_services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  details = JSON.parse(localStorage.getItem('details'))

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private _customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initialForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  // Initial form
  initialForm = () => {
    this.customerForm = this.fb.group({
      lastname: [this.details.lastname, [Validators.required]],
      firstname: [this.details.firstname, [Validators.required]],
      company: [this.details.company, [Validators.required]],
      address: [this.details.address, [Validators.required]],
      city: [this.details.city, [Validators.required]],
      postcode: [this.details.postcode, [Validators.required]],
      country: [this.details.country, [Validators.required]],
      joineddate: [this.details.joineddate, [Validators.required]],
    });
  }

  get f() { return this.customerForm.controls; }
  onSubmit = () => {

    const form = {
      id: this.details.id,
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
      this._customerService.updateCustomer(form).subscribe((res) => {
        alert('Sucess');
        this.router.navigate(['main/home']);
      }));

  }
}
