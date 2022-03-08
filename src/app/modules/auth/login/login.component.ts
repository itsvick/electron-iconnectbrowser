import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@api/services/auth.service';
import { Router } from '@angular/router';
import { IpcService } from '@app/services/ipc.service';
import { View } from '@models/entities/view';
import { QuestionService } from '@api/services/question.service';

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


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ipcService: IpcService,
    private questionService: QuestionService

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
    this.trimEmail();
    this.authenticating = true;
    if (!this.form.valid) {
      this.authenticating = false;
      return;
    }

    this.authService.authenticate(this.form.getRawValue()).subscribe({
      next: (response) => {
        sessionStorage.setItem('isOfflineMode', 'false');
        this.authenticating = false;

        this.uploadCachedViews();
      },
      error: (error) => {
        this.authenticating = false;
        if (error && error.status && error.status === 401) {
          this.customError = `Please check these credentials are incorrect.`;
        }
      }
    });
  }

  uploadCachedViews() {
    let offlineViews: [View] = JSON.parse(localStorage.getItem("offline-views"));
    for (const view of offlineViews) {
      this.questionService.getByCode(view.itemCode).subscribe(question => {
        if(question.id) {
          this.questionService.addVideoViews(view, question).subscribe(result => {
            if(result.id) {
              const index = offlineViews.map(view => view.itemCode).indexOf(view.itemCode);
              offlineViews.splice(index, 1);
              localStorage.setItem('offline-views', JSON.stringify(offlineViews));
            }
          })
        }
      })
    }
  }

  openWebRegister() {
    this.ipcService.openExternalLink('https://www.papervideo.co.za/auth/register');
  }
}
