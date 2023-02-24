import { LoginResponse } from './LoginResposne';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonAuthService } from '../shared-services/common-auth.service';
import { SigninService } from './signin.service';
import { UserRoles } from './app.constant';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css',
  '../../assets/css/bootstrap.min.css', 
  '../../assets/lib/animate/animate.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css'
]
})
export class SigninComponent implements OnInit {
  [x: string]: any;

  public loginForm!: FormGroup;
  loginResponse: LoginResponse = new LoginResponse();
  private subscriptions$: Subscription[] = [];
  public errorMsg: string | undefined;
  public Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  constructor(private router: Router, private signinService: SigninService, private commonAuthService: CommonAuthService) {

   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      contactNo: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      password: new FormControl(null, [Validators.required])
    });
    this.loginResponse.success = true;

  }
  public ngOnDestroy() : void{
    this.subscriptions$.map(sub => sub && sub.unsubscribe());  //standard logic
  }
  public loginFunction( ):void{
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
    const loginSub$ = this.signinService.login(this.loginForm.value).subscribe(
     ( resp : any) => {
        this.loginResponse.success=true;
        console.log('User logged in successfully ')
        this.commonAuthService.updateUserInSession(resp);
        this.routeToDashboard(resp);

      },
      (err)=>{
        this.loginResponse.success=false;
        console.log('Please enter valid username and password')
        console.log(err);
        this.errorMsg = err.error.message;
      }
    );
    this.subscriptions$.push(loginSub$);           //subsc array mdhe variable push kele aahe.


  }

  public routeToDashboard(response : any ):void{
    if(response && UserRoles.USER === response.userRole){
      this.router.navigate(['/dashboard']);

    }else{
      this.router.navigate(['/home'])
    }
  }

  public fireSignInSuccessSwal() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'login successful   ',
      showConfirmButton: false,
      timer: 1500,
    });
}
}






