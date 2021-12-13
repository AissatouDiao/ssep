import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AddRolesComponent } from './components/roles/add-roles/add-roles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GestionsutilisateursComponent } from './compenents/gestionsutilisateurs/gestionsutilisateurs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { RecommandationsComponent } from './components/recommandations/recommandations.component';
import { DocumentsevaluationsComponent } from './components/documentsevaluations/documentsevaluations.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PtbaComponent } from './components/ptba/ptba.component';
import { PlanificationComponent } from './components/ptba/planification/planification.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { GestionptbasComponent } from './components/ptba/gestionptbas/gestionptbas.component';
import { SuiviComponent } from './components/ptba/suivi/suivi.component';
import { ExcelService } from './services/excel.service';
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
import { PistesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/pistesem/pistesem.component';
import { DecomptesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/decomptesem/decomptesem.component';
import { GarantiesemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/garantiesem/garantiesem.component';
import { ContratsemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/contratsem/contratsem.component';
import { ProcesverbauxemComponent } from './components/pistesbavardes/travaux/regions/communes/executionmarche/procesverbauxem/procesverbauxem.component';
import { GestionpistesComponent } from './components/pistesbavardes/gestionpistes/gestionpistes.component';
import { NewuserAddpasswordComponent } from './components/password/newuser-addpassword/newuser-addpassword.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RapportsComponent } from './components/ptba/rapports/rapports.component';
// For MDB Angular Free
//import { } from "angular-bootstrap-md";
// For MDB Angular Free
//import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ChartsModule } from 'ng2-charts';

import MapView from '@arcgis/core/views/MapView';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import WebMap from '@arcgis/core/WebMap';
import { OrganisationsComponent } from './components/chainesdevaleurs/organisations/organisations.component';
import { OrganisationsaccompagneesComponent } from './components/chainesdevaleurs/organisationsaccompagnees/organisationsaccompagnees.component';
import { IdentificationComponent } from './components/chainesdevaleurs/identification/identification.component';
import { GeoreferencementComponent } from './components/chainesdevaleurs/georeferencement/georeferencement.component';
import { FormationsComponent } from './components/chainesdevaleurs/formations/formations.component';
import { SuiviproductionComponent } from './components/chainesdevaleurs/suiviproduction/suiviproduction.component';
import { AgreagequaliteComponent } from './components/chainesdevaleurs/agreagequalite/agreagequalite.component';
import { TransformationComponent } from './components/chainesdevaleurs/transformation/transformation.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AddRolesComponent,
    SidebarComponent,
    GestionsutilisateursComponent,
    DocumentsComponent,
    RecommandationsComponent,
    DocumentsevaluationsComponent,
    NotfoundComponent,
    PtbaComponent,
    PlanificationComponent,
    SearchFilterPipe,
    DashboardComponent,
    PartenairesComponent,
    GestionptbasComponent,
    SuiviComponent,
    PistesbavardesComponent,
    ChainesdevaleursComponent,
    PassationsdemarchesComponent,
    IndicateursComponent,
    TravauxComponent,
    ControleComponent,
    ZoneComponent,
    RegionsComponent,
    CommunesComponent,
    ExecutionmarcheComponent,
    Documents1Component,
    PrealablesemComponent,
    PistesemComponent,
    ProcesverbauxemComponent,
    DecomptesemComponent,
    GarantiesemComponent,
    ContratsemComponent,
    GestionpistesComponent,
    NewuserAddpasswordComponent,
    NotificationsComponent,
    RapportsComponent,
    OrganisationsComponent,
    OrganisationsaccompagneesComponent,
    IdentificationComponent,
    GeoreferencementComponent,
    FormationsComponent,
    SuiviproductionComponent,
    AgreagequaliteComponent,
    TransformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    NgxPaginationModule,
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    CdkTableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService, ExcelService, WebMap,],
  bootstrap: [AppComponent]
})
export class AppModule { }
