import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/core/_services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit, OnDestroy {


  detail = JSON.parse(localStorage.getItem('details'));
  private subscriptions: Subscription[] = []

  constructor(private _customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  edit = (row) => {
    this.router.navigate(['main/edit']);
    localStorage.setItem('details', JSON.stringify(row));
  }
  remove = (id) => {

    this.subscriptions.push(
      this._customerService.removeCustomer(id).subscribe(res => {
        alert('success deleted')
        this.router.navigate(['main/home'])
      }, error => {
        alert('Failed to delete ')
      })
    );

  }
}
