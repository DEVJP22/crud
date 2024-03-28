import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css'],
})
export class GetAllCustomersComponent implements OnInit {
  public spinner = false;
  customers: any = [];

  constructor(private service: CustomerServiceService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe((res) => {
      console.log(res);
      this.customers = res;
    });
  }
  // Delete operation
  deleteCustomer(id: number) {
    this.spinner = true;
    console.log(id);

    this.service.deleteCustomer(id).subscribe((res) => {
      console.log(res);

      this.getAllCustomers();
    });
  }
}
