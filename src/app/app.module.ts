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
import { ResourcesModule } from './modules/resources/resources.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { GlobalService } from '@api/services/general.service';
import { PapersModule } from './modules/papers/papers.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { VideoModule } from './modules/video/video.module';
import { MathJaxModule } from './modules/math-jax/math-jax.module';
import { ConnectionService } from './_session/lib/connection-service.service';
import { ImageDialogComponent } from '@shared/components/image-dialog/image-dialog.component';
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
    ResourcesModule,
    SubjectsModule,
    PapersModule,
    LessonsModule,
    VideoModule,
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
