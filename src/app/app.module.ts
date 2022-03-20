import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StaticModule } from './modules/static/static.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ApiInterceptor } from '@api/api.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { LayoutModule } from './layouts/layout.module';
import { AuthModule } from './modules/auth/auth.module';
import { AboutModule } from './modules/about/about.module';
import { AccountModule } from './modules/account/account.module';
import { FaqModule } from './modules/faq/faq.module';
import { GlobalService } from '@api/services/general.service';
import { ConnectionService } from './_session/lib/connection-service.service';
import { DialogsModule } from './modules/_dialogs/dialogs.module';

export function tokenGetter(): string {
  return sessionStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    LayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    AuthModule,
    StaticModule,
    AboutModule,
    AccountModule,
    FaqModule,
    DialogsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    GlobalService,
    { provide: 'googleTagManagerId', useValue: 'GTM-N42FB24' },
    ConnectionService
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
