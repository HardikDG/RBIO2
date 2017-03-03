import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
     firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

  testmethod() {
    return new Promise(function (resolve, reject) {
      this.http.get('http://your.server.url')
        .map(res => res.json())
        .subscribe((data: any) => {
          if (data) {
            reject(data)
          }
          resolve(data.Data);
        }, error => {
          reject(error);
        });
    });
  }
}
