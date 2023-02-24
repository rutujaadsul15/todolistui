import { Component, OnInit } from '@angular/core';
import { CommonAuthService } from '../shared-services/common-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
   '../../assets/css/bootstrap.min.css', 
   '../../assets/lib/animate/animate.css',
   '../../assets/lib/animate/animate.min.css',
   '../../assets/lib/owlcarousel/assets/owl.carousel.min.css']
})

export class HeaderComponent implements OnInit {
  [x: string]: any;

  public firstName: any;
  public lastName: any;
  constructor( private commonAuthService: CommonAuthService) { }


  ngOnInit(): void {
  }

  validLogin() {
    if ((sessionStorage.getItem('userRole')) && (sessionStorage.getItem('username'))) {
      this.firstName = sessionStorage.getItem('firstName');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.clear();
    this.commonAuthService.updateUserRole(''); //making user roll to known while logging out
    this['router'].navigate([''])
}


}

