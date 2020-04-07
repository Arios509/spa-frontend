import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/global/global.constant';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Get customer list
  getCustomers = () => {
    return this.http.get(`${environment.API_SERVER}/main/customer`, environment.httpOptions)
      .pipe(map((res) => {
        return res;
      }));
  }

  // Create customer list
  createCustomer = (form) => {
    return this.http.post(`${environment.API_SERVER}/main/customer`, form, environment.httpOptions)
      .pipe(map((res) => {
        return res;
      }));
  }

  // Create customer list
  updateCustomer = (form) => {
    return this.http.put(`${environment.API_SERVER}/main/customer`, form, environment.httpOptions)
      .pipe(map((res) => {
        return res;
      }));
  }

  // Remove customer
  removeCustomer = (id) => {
    return this.http.delete(`${environment.API_SERVER}/main/customer/` + id, environment.httpOptions);
  }
}
