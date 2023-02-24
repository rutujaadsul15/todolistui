import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',
  '../../assets/css/bootstrap.min.css', 
  '../../assets/lib/animate/animate.css',
  '../../assets/lib/animate/animate.min.css',
  '../../assets/lib/owlcarousel/assets/owl.carousel.min.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
