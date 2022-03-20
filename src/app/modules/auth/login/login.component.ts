import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@api/services/auth.service';
import { IpcService } from '@app/services/ipc.service';
import { Subject } from 'rxjs';

// import { shell } from 'electron';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractBaseComponent implements OnInit {

  form: FormGroup;
  loginWithEmail = true;
  hasExistingUser = false;
  existingUser = 'Name';
  authenticating: boolean;
  customError: string;

  $loading: Subject<boolean> = new Subject<boolean>();


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ipcService: IpcService,
  ) {
    super();
  }

  ngOnInit() {
    sessionStorage.removeItem('isOfflineMode');
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      loginCred: [null, [Validators.required]],
      password: [null, Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.customError = null;
    });
  }

  trimEmail() {
    this.form.get('loginCred').setValue((this.form.get('loginCred').value || '').trim());
  }

  authenticate() {
    if(this.authenticating) {
      return;
    }

    this.trimEmail();
    this.authenticating = true;
    this.$loading.next(this.authenticating);
    if (!this.form.valid) {
      this.authenticating = false;
      this.$loading.next(this.authenticating);
      return;
    }
    this.authService.authenticate({email_phone: this.form.getRawValue().loginCred, password: this.form.getRawValue().password}).subscribe({
      next: (response) => {
        sessionStorage.setItem('isOfflineMode', 'false');
        this.authenticating = false;
        this.$loading.next(this.authenticating);
        if(response.code !== '0000') {
          this.customError = response.message;
        }
      },
      error: (error) => {
        console.log('Error :', error);
        
        this.authenticating = false;
        this.$loading.next(this.authenticating);
        if (error && error.status && error.status === 401) {
          this.customError = `Please check these credentials are incorrect.`;
        }
      }
    });
  }

  uploadCachedViews() {

  }

  openWebRegister() {
  }
}
