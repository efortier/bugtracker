import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { IssuesComponent } from './components/issues/issues.component';
import { AuthGuard } from './guards/auth.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IssuesService } from './services/issues.service';
import { NewissueComponent } from './components/newissue/newissue.component';
import { CreateconfirmComponent } from './components/createconfirm/createconfirm.component';
import { ViewissueComponent } from './components/viewissue/viewissue.component';
import { UpdateconfirmComponent } from './components/updateconfirm/updateconfirm.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'issues', component: IssuesComponent, canActivate: [AuthGuard] },
  { path: 'newissue', component: NewissueComponent, canActivate: [AuthGuard] },
  { path: 'createconfirm', component: CreateconfirmComponent, canActivate: [AuthGuard] },
  { path: 'viewissue', component: ViewissueComponent, canActivate: [AuthGuard] },
  { path: 'updateconfirm', component: UpdateconfirmComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    IssuesComponent,
    NewissueComponent,
    CreateconfirmComponent,
    ViewissueComponent,
    UpdateconfirmComponent,
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, IssuesService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

