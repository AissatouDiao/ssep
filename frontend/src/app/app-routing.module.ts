import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionsutilisateursComponent } from './compenents/gestionsutilisateurs/gestionsutilisateurs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { LoginComponent } from './components/login/login.component';
import { Module1Component } from './components/module1/module1.component';
import { Module2Component } from './components/module2/module2.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecommandationsComponent } from './components/recommandations/recommandations.component';
import { AddRolesComponent } from './components/roles/add-roles/add-roles.component';
import { SignupComponent } from './components/signup/signup.component';
import { AfterloginService } from './services/afterlogin.service';
import { BeforeloginService } from './services/beforelogin.service';

const routes: Routes = [

  {
    path: 'login', component: LoginComponent,
    canActivate: [BeforeloginService]
  },
  {
    path: 'signup', component: SignupComponent,
    canActivate: [BeforeloginService]
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'request-password-reset', component: RequestResetComponent,
    canActivate: [BeforeloginService]
  },
  {
    path: 'response-password-reset', component: ResponseResetComponent,
    canActivate: [BeforeloginService]
  },

  {
    path: 'module_1', component: Module1Component,
    canActivate: [AfterloginService]
  },
  {
    path: 'module_2', component: Module2Component,
    canActivate: [AfterloginService]

  },
  {
    path: 'add-role', component: AddRolesComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-utilisateurs', component: GestionsutilisateursComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'documents', component: DocumentsComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'recommandations', component: RecommandationsComponent,
    canActivate: [AfterloginService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
