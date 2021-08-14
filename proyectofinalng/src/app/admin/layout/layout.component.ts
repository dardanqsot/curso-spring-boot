import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit {

  name!: String;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.name = this.authService.getName();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

}
