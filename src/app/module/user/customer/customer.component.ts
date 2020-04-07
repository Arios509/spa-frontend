import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CustomerService } from 'src/app/core/_services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  customerLists: any = [];
  constructor(private _customerService: CustomerService, private router: Router) { }


  ngOnInit(): void {
    this.getCustomerList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // Get customer list
  getCustomerList = () => {
    this.subscriptions.push(
      this._customerService.getCustomers().subscribe(res => {
        this.customerLists = res;
      })
    );
  }
  // view more

  view = (row: any) => {
    localStorage.setItem('details', JSON.stringify(row));
    this.router.navigate(['main/view']);
  }
  edit = (row: any) => {
    this.router.navigate(['main/edit']);
    localStorage.setItem('details', JSON.stringify(row));
  }
  remove = (id: any) => {

    this.subscriptions.push(
      this._customerService.removeCustomer(id).subscribe(res => {
        alert('success deleted')
        this.getCustomerList()
      }, error => {
        alert('Failed to delete ')
      })
    );

  }
}
