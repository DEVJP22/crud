import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  updateCustomerForm!: FormGroup;
  id: number = this.router.snapshot.params['id'];

  constructor(
    private router: ActivatedRoute,
    private service: CustomerServiceService,
    private fb: FormBuilder,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.router.snapshot.params['id']; // Parse the ID to number
    this.getCustomerById();
    this.updateCustomerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  get fun() {
    return this.updateCustomerForm.controls;
  }

  getCustomerById() {
    this.service.getCustomerById(this.id).subscribe(
      (res) => {
        console.log(res);
        this.updateCustomerForm.patchValue(res);
      },
      (error) => {
        console.error('Error fetching customer:', error);
        // Handle error here
      }
    );
  }

  updateCustomer() {
    this.service
      .updateCustomer(this.id, this.updateCustomerForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          // Navigate to the desired route after successfully updating the customer
          this.rout.navigate(['']); // Example: Navigate to home route
          // Show success message after navigation
          Swal.fire({
            title: 'Updated!',
            text: 'Your data has been updated.',
            icon: 'success',
          });
        },
        (error) => {
          console.error('Error updating customer:', error);
          // Handle error here
        }
      );
  }
}
