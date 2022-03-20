import { Component, OnInit } from '@angular/core';
import { AuthService } from '@api/services/auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

}
