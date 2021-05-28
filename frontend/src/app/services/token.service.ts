import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  }
  constructor() { }

  /*recuperation du token et stockage dans
   * la sauvegarde locale.
  */
  handle(token: any) {
    this.set(token);
    // console.log(this.isValid());
  }

  //stocker le token dans la sauvegarde locale
  set(token: any) {
    localStorage.setItem('token', token);
  }

  //récupération du token dans la sauvegarde locale
  get() {
    return localStorage.getItem('token');
  }

  //suppression du token dans la sauvegarde locale
  remove() {
    localStorage.removeItem('token');
  }

  //verifier si le token est valide
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {//iss c'est url d'où vient le token
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  //prendre la deuxieme partie du token 
  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  //faire le decodage de la fonction(pour retrouver l'attribut 'iss')
  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  //Voir si l'utilisateur is logged in or no
  loggedIn() {
    return this.isValid();
  }
}
