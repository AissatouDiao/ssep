import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionsutilisateursComponent } from './compenents/gestionsutilisateurs/gestionsutilisateurs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsevaluationsComponent } from './components/documentsevaluations/documentsevaluations.component';
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
import { NotfoundComponent } from './notfound/notfound.component';
import { PtbaComponent } from './components/ptba/ptba.component';
import { PlanificationComponent } from './components/ptba/planification/planification.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { GestionptbasComponent } from './components/ptba/gestionptbas/gestionptbas.component';
import { SuiviComponent } from './components/ptba/suivi/suivi.component';
import { PistesbavardesComponent } from './components/pistesbavardes/pistesbavardes.component';
import { ChainesdevaleursComponent } from './components/chainesdevaleurs/chainesdevaleurs.component';
import { PassationsdemarchesComponent } from './components/passationsdemarches/passationsdemarches.component';
import { IndicateursComponent } from './components/indicateurs/indicateurs.component';
import TravauxComponent from './components/pistesbavardes/travaux/travaux.component';
import { ControleComponent } from './components/pistesbavardes/controle/controle.component';
import { ZoneComponent } from './components/pistesbavardes/controle/zone/zone.component';
import { RegionsComponent } from './components/pistesbavardes/travaux/regions/regions.component';
import { CommunesComponent } from './components/pistesbavardes/travaux/regions/communes/communes.component';
import { ExecutionmarcheComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/executionmarche.component';
import { Documents1Component } from './components/pistesbavardes/travaux/regions/communes/documents/documents.component';


const routes: Routes = [

  {
    path: 'login', component: LoginComponent,
    canActivate: [BeforeloginService]
  },

  { path: '404-page-non-trouvee', component: NotfoundComponent },
  { path: '***', redirectTo: '/404-page-non-trouvee' },
  {
    path: 'signup', component: SignupComponent,
    canActivate: [BeforeloginService]
  },
  {
    path: 'tableau-de-bord', component: DashboardComponent,
    canActivate: [AfterloginService]
  },
  {
    path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full'
  }

  ,

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
  {
    path: 'documents-evaluations', component: DocumentsevaluationsComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-ptba', component: PtbaComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-ptba/planification-ptba', component: PlanificationComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-ptba/ptbas', component: GestionptbasComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-ptba/suivi-ptba', component: SuiviComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-partenaires', component: PartenairesComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes', component: PistesbavardesComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs', component: ChainesdevaleursComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-indicateurs', component: IndicateursComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-passations-marches', component: PassationsdemarchesComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux', component: TravauxComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/region/:id', component: RegionsComponent,
    canActivate: [AfterloginService]

  },
  {
    path: 'gestion-pistes-bavardes/travaux/region/commune/:id', component: CommunesComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/documents-commune/:id', component: Documents1Component,
    canActivate: [AfterloginService]
  }
  ,
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/executiondemarche', component: ExecutionmarcheComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/controle', component: ControleComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/controle/zone/:id', component: ZoneComponent,
    canActivate: [AfterloginService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
