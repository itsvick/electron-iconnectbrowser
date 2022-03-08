import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaticLayoutComponent } from './layouts/static-layout/static-layout.component';
import { AuthGuard } from './auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { WelcomeComponent } from './modules/auth/welcome/welcome.component';
import { LayoutFullComponent } from './layouts/layout-full/layout-full.component';
import { LoginComponent } from './modules/auth/login/login.component';

export const routes = [
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [
  //     { path: '', component: WelcomeComponent },
  //   ]
  // },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: 'auth',
  //       loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  //     },
  //   ],
  // },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
    ]
  },
  // WelcomeComponent
  {
    path: 'experimental',
    component: StaticLayoutComponent,
  },
  {
    path: '',
    component: LayoutFullComponent,
    children: [
      {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'faq',
        loadChildren: () => import('./modules/faq/faq.module').then((m) => m.FaqModule),
      },
      {
        path: 'resources',
        loadChildren: () => import('./modules/resources/resources.module').then((m) => m.ResourcesModule),
      },
      {
        path: 'subjects',
        loadChildren: () => import('./modules/subjects/subjects.module').then((m) => m.SubjectsModule),
      },
      {
        path: 'papers',
        loadChildren: () => import('./modules/papers/papers.module').then((m) => m.PapersModule),
      },
      {
        path: 'videos',
        loadChildren: () => import('./modules/video/video.module').then((m) => m.VideoModule),
      },
      {
        path: 'lessons',
        loadChildren: () => import('./modules/lessons/lessons.module').then((m) => m.LessonsModule),
      },
      {
        path: 'browser',
        loadChildren: () => import('./modules/browser/browser.module').then((m) => m.BrowserModule),
      },
    ],
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
