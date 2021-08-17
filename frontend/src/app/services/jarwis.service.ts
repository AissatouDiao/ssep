import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  getPartenairesAssocies() {
    throw new Error('Method not implemented.');
  }
  getsactivitesbudget(nombre: { id: number; }) {
    throw new Error('Method not implemented.');
  }
  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  //service pour login
  login(data: Object) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  //service pour signup
  signup(data: Object) {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  //recevoir les informations de l'utilisateur courant
  //Recuperer tous les rôles dans la base de données
  getUserInformations() {
    return this.http.get(`${this.baseUrl}/me`);
  }


  //service pour envoyer un lien de réinitialisation de mot de passe
  sendPasswordResetLink(data: any) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }

  //service pour envoyer un lien de réinitialisation de mot de passe
  changePassword(data: any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }


  //Ajouter un nouveau role à l'utilisateur
  addRole(data: any) {
    return this.http.post(`${this.baseUrl}/addRole`, data)
  }

  //Recuperer tous les rôles dans la base de données   
  getRoles() {
    return this.http.get(`${this.baseUrl}/getRoles`);
  }

  //supprimer role
  deleterole(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteRole/` + data);
  }


  //recuperer toutes les noms de modules dans la base
  getModules() {
    return this.http.get(`${this.baseUrl}/getModules`);
  }

  //Ajouter les permisssions pour les modules pour un rôle donné
  addPermissions(data: object) {
    return this.http.post(`${this.baseUrl}/addpermissions`, data)
  }


  //recuperer tous les permissions dans la base de données.
  getPermissions() {
    return this.http.get(`${this.baseUrl}/getPermissions`);
  }
  //recuperer tous les utilisateurs dans la base de données.
  getUsers() {
    return this.http.get(`${this.baseUrl}/getUsers`);
  }

  //supprimer l'utilisateur
  deleteUser(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteUser/` + data);
  }
  //Ajouter les permisssions pour les modules pour un rôle donné
  updateRoleUser(data: object) {
    return this.http.post(`${this.baseUrl}/updateuserrole`, data)
  }

  //Ajouter les permisssions pour les modules pour un rôle donné
  updateProfileUser(data: object) {
    return this.http.post(`${this.baseUrl}/updateuserprofile`, data)
  }


  //Ajouter les permisssions pour les modules pour un rôle donné
  changePasswordProfile(data: object) {
    return this.http.post(`${this.baseUrl}/changepasswordprofile`, data)
  }

  //Recuperer tous les reommandations dans la base de données
  getRecommandations() {
    return this.http.get(`${this.baseUrl}/getrecommandations`);
  }
  //Recuperer tous les reommandations dans la base de données
  getRecommandationsByEvaluationId(data: any) {
    return this.http.post(`${this.baseUrl}/getrecommandationsbyevaluationsid`, data);
  }
  //Ajouter une nouvelle recommandation
  addRecommandation(data: object) {
    return this.http.post(`${this.baseUrl}/addrecommandation`, data);
  }
  //update recommandation
  updateRecommandation(data: object) {
    return this.http.post(`${this.baseUrl}/updaterecommandation`, data)
  }

  //supprimer recommandation
  deleterecommandation(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteRecommandation/` + data);
  }

  //Ajouter une nouvelle recommandation
  changeStatutRecommandation(data: object) {
    return this.http.post(`${this.baseUrl}/changestatutrecommandation`, data)
  }

  //Recuperer tous les documents partagés dans la base de données
  getDocuments() {
    return this.http.get(`${this.baseUrl}/getdocuments`);
  }
  //Ajouter un nouveau document
  addDocument(data: object) {
    return this.http.post(`${this.baseUrl}/adddocument`, data, { responseType: 'blob' });
  }
  //update document
  updateDocument(data: object) {
    return this.http.post(`${this.baseUrl}/updatedocument`, data)
  }

  //supprimer document
  deletedocument(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteDocument/` + data);
  }

  //Recuperer tous les evaluations partagés dans la base de données
  getEvaluations() {
    return this.http.get(`${this.baseUrl}/getevaluations`);
  }
  //Ajouter un nouveau evaluation
  addEvaluation(data: object) {
    return this.http.post(`${this.baseUrl}/addevaluation`, data, { responseType: 'json' });
  }
  //update evaluation
  updateEvaluation(data: object) {
    return this.http.post(`${this.baseUrl}/updateevaluation`, data)
  }

  //supprimer evaluation
  deleteEvaluation(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteEvaluation/` + data);
  }

  //Recuperer tous les evaluations partagés dans la base de données
  getPartenaires() {
    return this.http.get(`${this.baseUrl}/getpartenaires`);
  }
  //Ajouter un nouveau partenaire
  addPartenaire(data: object) {
    return this.http.post(`${this.baseUrl}/addpartenaire`, data);
  }
  //update partenaire
  updatePartenaire(data: object) {
    return this.http.post(`${this.baseUrl}/updatepartenaire`, data)
  }

  //supprimer partenaire
  deletePartenaire(data: any) {
    return this.http.delete(`${this.baseUrl}/deletePartenaire/` + data);
  }

  //update partenaire apport
  updatePartenaireApport(data: object) {
    return this.http.post(`${this.baseUrl}/updatepartenaireapport`, data)
  }
  //-------PTBA--------//

  //Ajouter une nouvelle recommandation
  changeStatutPtba(data: object) {
    return this.http.post(`${this.baseUrl}/changestatutreptba`, data)
  }
  getPtbas() {
    return this.http.get(`${this.baseUrl}/getptbas`);
  }
  getpartenairesptbas() {
    return this.http.get(`${this.baseUrl}/getpartenairesptbas`);
  }

  //Ajouter un nouveau ptba
  addPtba(data: object) {
    return this.http.post(`${this.baseUrl}/addptba`, data);
  }
  //update ptba
  updatePtba(data: object) {
    return this.http.post(`${this.baseUrl}/updateptba`, data)
  }

  //supprimer ptba
  deletePtba(data: any) {
    return this.http.delete(`${this.baseUrl}/deletePtba/` + data);
  }
  //-------Composante--------//
  getComposantes() {
    return this.http.get(`${this.baseUrl}/getcomposantes`);
  }
  getComposantePartenaires() {
    return this.http.get(`${this.baseUrl}/getComposantePartenaires`);
  }
  //Ajouter un nouveau composante
  addComposante(data: object) {
    return this.http.post(`${this.baseUrl}/addcomposante`, data);
  }
  //update composante
  updateComposante(data: object) {
    return this.http.post(`${this.baseUrl}/updatecomposante`, data)
  }

  //supprimer composante
  deleteComposante(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteComposante/` + data);
  }

  //-------Activite--------//
  getActivites() {
    return this.http.get(`${this.baseUrl}/getactivites`);
  }
  getactivitespartenaireassocies() {
    return this.http.get(`${this.baseUrl}/getactivitespartenaireassocies`);
  }
  getactivitespartenairesfinanciers() {
    return this.http.get(`${this.baseUrl}/getactivitespartenairesfinanciers`);
  }
  getactivitespartenairesresponsables() {
    return this.http.get(`${this.baseUrl}/getactivitespartenairesresponsables`);
  }
  //Ajouter un nouveau activite
  addActivite(data: object) {
    return this.http.post(`${this.baseUrl}/addactivite`, data);
  }
  //Ajouter un nouveau partenaire associé
  addActivitePartenaireAssocies(data: object) {
    return this.http.post(`${this.baseUrl}/addactivitepartenairesassocies`, data);
  }
  //Ajouter un nouveau partenaire associé
  addActivitePartenaireFinanciers(data: object) {
    return this.http.post(`${this.baseUrl}/addactivitepartenairefinanciers`, data);
  }
  //Ajouter un nouveau partenaire associé
  addActivitePartenaireResponsable(data: object) {
    return this.http.post(`${this.baseUrl}/addactivitepartenaireresponsables`, data);
  }
  //update activite
  updateActivite(data: object) {
    return this.http.post(`${this.baseUrl}/updateactivite`, data)
  }

  //supprimer activite
  deleteActivite(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteActivite/` + data);
  }
  deletepartenaireassocie(data: any) {
    return this.http.delete(`${this.baseUrl}/deletepartenaireassocie/` + data);
  }
  deletepartenairefinancier(data: any) {
    return this.http.delete(`${this.baseUrl}/deletepartenairefinancier/` + data);
  }
  deletepartenaireresponsable(data: any) {
    return this.http.delete(`${this.baseUrl}/deletepartenaireresponsable/` + data);
  }

  //-------Sousactivite--------//getmoisactivites
  getpartenaires_sa() {
    return this.http.get(`${this.baseUrl}/getpartenaires_sa`);
  }
  getSousactivites() {
    return this.http.get(`${this.baseUrl}/getsousactivites`);
  }
  getMois() {
    return this.http.get(`${this.baseUrl}/getmois`);
  }
  getMoisSousActivites() {
    return this.http.get(`${this.baseUrl}/getmoissousactivites`);
  }
  //Ajouter un nouveau sousactivite
  addSousactivite(data: object) {
    return this.http.post(`${this.baseUrl}/addsousactivite`, data);
  }
  //update sousactivite
  updateSousactivite(data: object) {
    return this.http.post(`${this.baseUrl}/updatesousactivite`, data)
  }

  //supprimer sousactivite
  deleteSousactivite(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteSousactivite/` + data);
  }

  deletePartenaireSA(data: any) {
    return this.http.delete(`${this.baseUrl}/deletePartenaire/` + data);
  }
  deleteMoisSA(data: any) {
    return this.http.delete(`${this.baseUrl}/deletemoisousactivite/` + data);
  }

  //Ajouter un nouveau partenaire financier pour une sous activité
  addPartenaireFinanciersSousactivites(data: object) {
    return this.http.post(`${this.baseUrl}/addpartenairefinancierssousactivites`, data);
  }

  //Ajouter un mois pour une sous activité
  addMoisSousactivites(data: object) {
    return this.http.post(`${this.baseUrl}/addmoissousactivites`, data);
  }

  /////------ Budget ------///////

  getsousactivitesbudget(data: object) {
    return this.http.post(`${this.baseUrl}/getsousactivitesbudget`, data);
  }
  getactivitebudgettotal(data: object) {
    return this.http.post(`${this.baseUrl}/getactivitebudgettotal`, data);
  }
  getcomposantebudgettotal(data: object) {
    return this.http.post(`${this.baseUrl}/getcomposantebudgettotal`, data);
  }
  getptbabudgettotal(data: object) {
    return this.http.post(`${this.baseUrl}/getptbabudgettotal`, data);
  }
  test(data: object) {
    return this.http.post(`${this.baseUrl}/test`, data);
  }

  //------Passation marché------//

  //Recuperer tous les evaluations partagés dans la base de données
  getPassations() {
    return this.http.get(`${this.baseUrl}/getpassationmarches`);
  }
  //Ajouter un nouveau partenaire
  addPassation(data: object) {
    return this.http.post(`${this.baseUrl}/addpassationmarche`, data);
  }
  //update partenaire
  updatePassation(data: object) {
    return this.http.post(`${this.baseUrl}/updatepassationmarche`, data)
  }

  //supprimer partenaire 
  deletePassation(data: any) {
    return this.http.delete(`${this.baseUrl}/deletepassation/` + data);
  }

  //change statut passation 
  changestatutpassation(data: object) {
    return this.http.post(`${this.baseUrl}/changestatutpassation`, data)
  }

  //Ajouter un nouveau partenaire getpassationpropositions
  addProposition(data: object) {
    return this.http.post(`${this.baseUrl}/addpassationproposition`, data);
  }

  getPassationsPropositions() {
    return this.http.get(`${this.baseUrl}/getpassationpropositions`);
  }

  //--------Zone-------//
  //Recuperer tous les evaluations partagés dans la base de données
  getZones() {
    return this.http.get(`${this.baseUrl}/getzones`);
  }
  //Ajouter un nouvelle zone
  addZone(data: object) {
    return this.http.post(`${this.baseUrl}/addzone`, data);
  }
  //update zone
  updateZone(data: object) {
    return this.http.post(`${this.baseUrl}/updatezone`, data)
  }

  //supprimer zone
  deleteZone(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteZone/` + data);
  }

  //zone par id
  getZoneById(data: any) {
    return this.http.get(`${this.baseUrl}/getZoneById/` + data);
  }

  //-------- Decomptes Zones ----------//

  //Recuperer tous les decomptes zones dans la base de données
  getDecompteZones() {
    return this.http.get(`${this.baseUrl}/getdecomptezones`);
  }
  //Ajouter un nouvelle decompte zone
  addDecompteZone(data: object) {
    return this.http.post(`${this.baseUrl}/adddecomptezone`, data);
  }
  //update decompte zone
  updateDecompteZone(data: object) {
    return this.http.post(`${this.baseUrl}/updatedecomptezone`, data)
  }

  //supprimer decompte zone
  deleteDecompteZone(data: any) {
    return this.http.delete(`${this.baseUrl}/deletedecompteZone/` + data);
  }

  //decompte par id 
  getDecompteById(data: any) {
    return this.http.get(`${this.baseUrl}/getDecompteById/` + data);
  }

  //Decompte zone by zone id
  getZoneDecompteById(data: any) {
    return this.http.get(`${this.baseUrl}/getZoneDecompteById/` + data);
  }

  //---------- Prealable Zone -----------//


  //Recuperer tous les evaluations partagés dans la base de données
  getPrealableZones() {
    return this.http.get(`${this.baseUrl}/getprealablezones`);
  }
  //Ajouter un nouvel prealable zone
  addPrealableZone(data: object) {
    return this.http.post(`${this.baseUrl}/addprealablezone`, data);
  }
  //update prealable zone
  updatePrealableZone(data: object) {
    return this.http.post(`${this.baseUrl}/updateprealablezone`, data)
  }

  //supprimer prealable zone
  deletePrealableZone(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteprealableZone/` + data);
  }

  //Prealable par id 
  getPrealableById(data: any) {
    return this.http.get(`${this.baseUrl}/getPrealableById/` + data);
  }

  getZonePrealableById(data: any) {
    return this.http.get(`${this.baseUrl}/getZonePrealableById/` + data);
  }


  //-------------- Proces verbal -----------------//

  //Recuperer tous les evaluations partagés dans la base de données
  getProcesVerbalZones() {
    return this.http.get(`${this.baseUrl}/getprocesverbalzones`);
  }
  //Ajouter un nouvel prealable zone
  addProcesVerbalZone(data: object) {
    return this.http.post(`${this.baseUrl}/addprocesverbalzone`, data);
  }
  //update prealable zone
  updateProcesVerbalZone(data: object) {
    return this.http.post(`${this.baseUrl}/updateprocesverbalzone`, data)
  }

  //supprimer prealable zone
  deleteProcesVerbalZone(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteprocesverbalZone/` + data);
  }

  //Proces Verbal par id 
  getProcesVerbalById(data: any) {
    return this.http.get(`${this.baseUrl}/getProcesVerbalById/` + data);
  }

  getZoneProcesVerbalById(data: any) {
    return this.http.get(`${this.baseUrl}/getZoneProcesVerbalById/` + data);
  }


  //-------------- Rapport d'activite -----------------//

  //Recuperer tous les evaluations partagés dans la base de données
  getRapportDActiviteZone() {
    return this.http.get(`${this.baseUrl}/getrapportdactivitezones`);
  }
  //Ajouter un nouvel prealable zone
  addRapportDActiviteRapportZone(data: object) {
    return this.http.post(`${this.baseUrl}/addrapportdactivitezone`, data);
  }
  //update prealable zone
  updateRapportDActiviteZone(data: object) {
    return this.http.post(`${this.baseUrl}/updaterapportdactivitezone`, data)
  }

  //supprimer prealable zone
  deleteRapportDActiviteZone(data: any) {
    return this.http.delete(`${this.baseUrl}/deleterapportdactiviteZone/` + data);
  }

  //Rapport d'activité par id  
  getRapportActiviteById(data: any) {
    return this.http.get(`${this.baseUrl}/getRapportActiviteById/` + data);
  }

  getZoneRapportActiviteById(data: any) {
    return this.http.get(`${this.baseUrl}/getRapportActiviteById/` + data);
  }
  //-------------------------Regions-----------------------------//

  //Recuperer tous les evaluations partagés dans la base de données
  getRegions() {
    return this.http.get(`${this.baseUrl}/getregions`);
  }
  //Ajouter un nouvelle region
  addRegion(data: object) {
    return this.http.post(`${this.baseUrl}/addregion`, data);
  }
  //update region
  updateRegion(data: object) {
    return this.http.post(`${this.baseUrl}/updateregion`, data)
  }

  //supprimer region
  deleteRegion(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteRegion/` + data);
  }

  //region par id
  getRegionById(data: any) {
    return this.http.get(`${this.baseUrl}/getRegionById/` + data);
  }

  //------------------ Communes ------------------//

  //Recuperer tous les evaluations partagés dans la base de données
  getCommunes() {
    return this.http.get(`${this.baseUrl}/getcommunes`);
  }
  //Ajouter un nouvelle commune
  addCommune(data: object) {
    return this.http.post(`${this.baseUrl}/addcommune`, data);
  }
  //update commune
  updateCommune(data: object) {
    return this.http.post(`${this.baseUrl}/updatecommune`, data)
  }

  //supprimer commune
  deleteCommune(data: any) {
    return this.http.delete(`${this.baseUrl}/deleteCommune/` + data);
  }

  //commune par id
  getCommuneById(data: any) {
    return this.http.get(`${this.baseUrl}/getCommuneById/` + data);
  }

}
