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

  //recuperer toutes les noms de modules dans la base
  getModules() {
    return this.http.get(`${this.baseUrl}/getModules`);
  }

  //Ajouter les permisssions pour les modules pour un rôle donné
  addPermissions(data: object) {
    return this.http.post(`${this.baseUrl}/addpermissions`, data)
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

}
