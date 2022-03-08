import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@api/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  passwordControl = new FormControl();
  confirmPasswordControl = new FormControl();
  title: string;
  buttonText: string;
  create: boolean;
  // http://localhost:4200/auth/create-password/18891b6f-7b7b-4aff-a7b7-5517ac7776ae
  constructor(
    private route: ActivatedRoute, private router: Router,
    private authService: AuthService,) {
    this.token = this.route.snapshot.paramMap.get('token');
    this.create = this.route.snapshot.url[0].path === 'create-password';
    if (this.create) {
      this.title = 'Create your password';
      this.buttonText = 'Create Password';
    } else {
      this.title = 'Reset your password';
      this.buttonText = 'Update Password';
    }
  }

  ngOnInit() {
  }

  updatePassword() {
    this.authService.changePassword({
      resetPasswordKey: this.token,
      password: this.passwordControl.value,
      confirmPassword: this.confirmPasswordControl.value,
    }).subscribe(() => {
      this.router.navigate(['/auth/login']);
      // this.generalService.showToast(this.create ? 'Password Created' : 'Password updated');
    }, () => {
      // this.generalService.showToast(this.create ?
      //   'Failed to create password, invalid or expired token' :
      //   'Failed to update password, invalid or expired token');
    });
  }

}
