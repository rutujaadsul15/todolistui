import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  '../../assets/css/bootstrap.min.css', 
  '../../assets/lib/animate/animate.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css']
})
export class HomeComponent implements OnInit {
  commonAuthService: any;
  router: any;

  constructor() { }

  ngOnInit(): void {
  }
  logout() {
    sessionStorage.clear();
    this.commonAuthService.updateUserRole(''); //making user roll to known while logging out
    this.router.navigate([''])
}
}
