// // // import { NgModule } from '@angular/core';
// // // import { BrowserModule } from '@angular/platform-browser';

// // // import { AppRoutingModule } from './app-routing.module';
// // // import { AppComponent } from './app.component';
// // // import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// // // import { HomeComponent } from './componet/home/home.component';
// // // import { DownloadComponent } from './componet/download/download.component';
// // // import { LoginComponent } from './componet/login/login.component';
// // // import { RegisterComponent } from './componet/register/register.component';
// // // import { DashboardComponent } from './componet/dashboard/dashboard.component';
// // // import { HeaderComponent } from './shared/component/header/header.component';
// // // import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// // // import { ReactiveFormsModule } from '@angular/forms';
// // // import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// // // import { MatProgressBarModule } from '@angular/material/progress-bar';
// // // import { MatSnackBarModule } from '@angular/material/snack-bar';
// // // import { AuthInterceptor } from './interceptors/auth.interceptor';

// // // @NgModule({
// // //   declarations: [
// // //     AppComponent,
// // //     HomeComponent,
// // //     DownloadComponent,
// // //     LoginComponent,
// // //     RegisterComponent,
// // //     DashboardComponent,
// // //     HeaderComponent
// // //   ],
// // //   imports: [
// // //     BrowserModule,
// // //     AppRoutingModule,
// // //     HttpClientModule,
// // //     ReactiveFormsModule,
// // //     BrowserAnimationsModule,
// // //     MatProgressBarModule,
// // //     MatSnackBarModule
// // //   ],
// // //   providers: [
// // //     provideAnimationsAsync(),
// // //     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// // //   ],
// // //   bootstrap: [AppComponent]
// // // })
// // // export class AppModule { }


// // import { NgModule } from '@angular/core';
// // import { BrowserModule } from '@angular/platform-browser';

// // import { AppRoutingModule } from './app-routing.module'; 
// // //any feature module or lazy-loaded module. It's a good habit to include it here to ensure everything is available.

// // //These changes will make your application's setup more correct and robust and are very likely to fix the redirection issue you are experiencing
// // import { AppComponent } from './app.component';
// // import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// // import { HomeComponent } from './componet/home/home.component';
// // import { DownloadComponent } from './componet/download/download.component';
// // import { LoginComponent } from './componet/login/login.component';
// // import { RegisterComponent } from './componet/register/register.component';
// // import { DashboardComponent } from './componet/dashboard/dashboard.component';
// // import { HeaderComponent } from './shared/component/header/header.component';
// // import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// // import { ReactiveFormsModule } from '@angular/forms';
// // // THIS IMPORT IS NO LONGER NEEDED: import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// // import { MatProgressBarModule } from '@angular/material/progress-bar';
// // import { MatSnackBarModule } from '@angular/material/snack-bar';
// // import { AuthInterceptor } from './interceptors/auth.interceptor';

// // @NgModule({
// //   declarations: [
// //     AppComponent,
// //     HomeComponent,
// //     DownloadComponent,
// //     LoginComponent,
// //     RegisterComponent,
// //     DashboardComponent,
// //     HeaderComponent
// //   ],
// //   imports: [
// //     BrowserModule,
// //     AppRoutingModule,
// //     HttpClientModule,
// //     ReactiveFormsModule,
// //     // REMOVED FROM HERE: BrowserAnimationsModule,
// //     MatProgressBarModule,
// //     MatSnackBarModule
// //   ],
// //   providers: [
// //     // This is the correct and modern way to provide animations.
// //     provideAnimationsAsync(), 
// //     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// //   ],
// //   bootstrap: [AppComponent]
// // })
// // export class AppModule { }

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './componet/home/home.component';
// import { DownloadComponent } from './componet/download/download.component';
// import { LoginComponent } from './componet/login/login.component';
// import { RegisterComponent } from './componet/register/register.component';
// import { DashboardComponent } from './componet/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard'; // Assuming you have this guard

// const routes: Routes = [
//   // Most specific routes first
//   { path: 'download/batch/:id', component: DownloadComponent },
//   { path: 'download/:id', component: DownloadComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   // Less specific routes
//   { path: '', component: HomeComponent },
  
//   // Wildcard route MUST be last
//   { path: '**', redirectTo: '' } 
// ];

// @NgModule({
//   // THE FIX IS HERE: We explicitly tell the router to NOT use the hash strategy.
//   imports: [RouterModule.forRoot(routes, { useHash: false })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- IMPORTANT: For *ngIf, *ngFor, etc.

// App specific imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componet/home/home.component';
import { DownloadComponent } from './componet/download/download.component';
import { LoginComponent } from './componet/login/login.component';
import { RegisterComponent } from './componet/register/register.component';
import { DashboardComponent } from './componet/dashboard/dashboard.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Angular Material and Animations
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // <-- IMPORTANT: For the progress bar
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DownloadComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule, // <-- IMPORTED HERE
    MatProgressBarModule, // <-- IMPORTED HERE
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }