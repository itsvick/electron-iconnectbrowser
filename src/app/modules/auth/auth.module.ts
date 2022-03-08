import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-passsword/forgot-passsword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { WelcomeComponent } from './welcome/welcome.component';


const STATIC_IMPORTS = [
  SharedModule,
  CommonModule
];

const EXPORTED_DECLARATIONS = [
  LoginComponent,
  RegisterComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  ForbiddenComponent,
  WelcomeComponent,
];

@NgModule({
  imports: [
    STATIC_IMPORTS,
    AuthRoutingModule,
    SharedModule
  ],
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS
})
export class AuthModule {
}
