import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
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
  //Ajouter une nouvelle recommandation
  addRecommandation(data: object) {
    return this.http.post(`${this.baseUrl}/addrecommandation`, data, { responseType: 'blob' });
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
    return this.http.post(`${this.baseUrl}/addevaluation`, data, { responseType: 'blob' });
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




}
