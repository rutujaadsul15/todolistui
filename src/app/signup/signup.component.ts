import { SignupService } from './signup.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonAuthService } from '../shared-services/common-auth.service';

import { Subscription } from 'rxjs/internal/Subscription';
// import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { SignupResponse } from '../model/SignupResponse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',
  '../../assets/css/bootstrap.min.css', 
  '../../assets/lib/animate/animate.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css'
],
})
export class SignupComponent implements OnInit {
  public signupForm! : FormGroup;
  public signupResponse!: SignupResponse;
  private subscription$: Subscription[] = [];

  constructor(
    private router: Router,
    private commonAuthService: CommonAuthService,
    private signupService: SignupService,
    // private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      contactNo: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscription$.map((sub) => sub && sub.unsubscribe());
  }

  public signUp() {
    // this.spinnerService.show();
    const signupSub$ = this.signupService
      .signup(this.signupForm.value)
      .subscribe(
        (resp: SignupResponse) => {
          this.fireSignInSuccessSwal();
          this.signupResponse = resp;
          // this.spinnerService.hide();
          this.router.navigate(['/signin']);
        },
        (err) => {
          console.log(err);
          // this.spinnerService.hide();
          Swal.fire(
            err.error.Exception
          )
        }
      );
    this.subscription$.push(signupSub$);
  }

  public fireSignInSuccessSwal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sign up successful ! Please Login to proceed to further ',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
