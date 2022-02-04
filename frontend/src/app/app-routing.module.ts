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
import { PrealablesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/prealablesem/prealablesem.component';
import { GarantiesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/garantiesem/garantiesem.component';
import { DecomptesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/decomptesem/decomptesem.component';
import { ProcesverbauxemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/procesverbauxem/procesverbauxem.component';
import { ContratsemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/contratsem/contratsem.component';
import { PistesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/pistesem/pistesem.component';
import { GestionpistesComponent } from './components/pistesbavardes/gestionpistes/gestionpistes.component';
import { NewuserAddpasswordComponent } from './components/password/newuser-addpassword/newuser-addpassword.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RapportsComponent } from './components/ptba/rapports/rapports.component';
import { OrganisationsComponent } from './components/chainesdevaleurs/organisations/organisations.component';
import { IdentificationComponent } from './components/chainesdevaleurs/identification/identification.component';
import { OrganisationsaccompagneesComponent } from './components/chainesdevaleurs/organisationsaccompagnees/organisationsaccompagnees.component';
import { FormationsComponent } from './components/chainesdevaleurs/formations/formations.component';
import { SuiviproductionComponent } from './components/chainesdevaleurs/suiviproduction/suiviproduction.component';
import { AgreagequaliteComponent } from './components/chainesdevaleurs/agreagequalite/agreagequalite.component';
import { GeoreferencementComponent } from './components/chainesdevaleurs/georeferencement/georeferencement.component';
import { TransformationComponent } from './components/chainesdevaleurs/transformation/transformation.component';


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
    path: '', redirectTo: 'login', pathMatch: 'full'
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
    path: 'user-add-password', component: NewuserAddpasswordComponent,
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
    path: 'gestion-ptba/rapports', component: RapportsComponent,
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
    path: 'gestion-chaines-de-valeurs/organisations', component: OrganisationsComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/organisations-accompagnees', component: OrganisationsaccompagneesComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/identifications', component: IdentificationComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/formations', component: FormationsComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/suivi-production', component: SuiviproductionComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/georeferencement', component: GeoreferencementComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/agreage-qualite', component: AgreagequaliteComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-chaines-de-valeurs/transformation', component: TransformationComponent,
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
    path: 'gestion-pistes-bavardes/pistes', component: GestionpistesComponent,
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
    path: 'gestion-pistes-bavardes/travaux/regions/commune/documents/:id', component: Documents1Component,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/prealable/:id', component: PrealablesemComponent,
    canActivate: [AfterloginService]
  }
  ,
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/piste/:id', component: PistesemComponent,
    canActivate: [AfterloginService]
  }
  ,
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/proces-verbaux/:id', component: ProcesverbauxemComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/decomptes/:id', component: DecomptesemComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/garanties/:id', component: GarantiesemComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/contrats/:id', component: ContratsemComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/:id', component: ExecutionmarcheComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/controle', component: ControleComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'gestion-pistes-bavardes/controle/zone/:id', component: ZoneComponent,
    canActivate: [AfterloginService]
  },
  {
    path: 'notifications', component: NotificationsComponent,
    canActivate: [AfterloginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
