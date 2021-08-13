import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule } from "@angular/Forms";
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
import { TravauxComponent } from './components/pistesbavardes/travaux/travaux.component';
import { ControleComponent } from './components/pistesbavardes/controle/controle.component';
import { ZoneComponent } from './components/pistesbavardes/controle/zone/zone.component';
import { RegionsComponent } from './components/pistesbavardes/travaux/regions/regions.component';



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
    RegionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
