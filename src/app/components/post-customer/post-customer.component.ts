import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-customer',
  templateUrl: './post-customer.component.html',
  styleUrls: ['./post-customer.component.css'],
})
export class PostCustomerComponent implements OnInit {
  postForm!: FormGroup;

  constructor(
    private cmservice: CustomerServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  get fun() {
    return this.postForm.controls;
  }

  postCustomer() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, post it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform post action only if the user confirms=============================================
        this.cmservice.postCustomer(this.postForm.value).subscribe((res) => {
          console.log(res);
          this.router.navigate(['']);
        });
        //post action ends here -----------------------------------------
        Swal.fire({
          title: 'Posted!',
          text: 'Your data has been posted.',
          icon: 'success',
        });
      }
    });
  }
}
