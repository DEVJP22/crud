import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = ['http://localhost:1555/'];
@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}

  // method for post customer
  postCustomer(customer: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/customer', customer);
  }

  // Methods for get all Customers
  getAllCustomers(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customers');
  }
  //delete customer
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}api/customer/${id}`);
  }
  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/customer/${id}`);
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/customer/${id}`, customer);
  }
}
