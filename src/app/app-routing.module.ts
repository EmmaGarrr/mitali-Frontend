// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './componet/home/home.component';
// import { LoginComponent } from './componet/login/login.component';
// import { RegisterComponent } from './componet/register/register.component';
// import { DownloadComponent } from './componet/download/download.component';
// import { DashboardComponent } from './componet/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'download/:id', component: DownloadComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: '' } // Wildcard route
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componet/home/home.component';
import { DownloadComponent } from './componet/download/download.component';
import { LoginComponent } from './componet/login/login.component';
import { RegisterComponent } from './componet/register/register.component';
import { DashboardComponent } from './componet/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Most specific routes first
  { path: 'download/batch/:id', component: DownloadComponent },
  { path: 'download/:id', component: DownloadComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Less specific routes
  { path: '', component: HomeComponent },
  
  // Wildcard route MUST be last
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], // <-- Correct hash setting
  exports: [RouterModule]
})
export class AppRoutingModule { }