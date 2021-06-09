import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Usuario,Usuarios } from '../models/usuario.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //users: Usuario[];
  
  constructor(private storage: Storage, private http: HttpClient) { 
  }

  async getUsers() {
    let users = await this.http.get<Usuarios>("https://jsonplaceholder.typicode.com/users").toPromise();
    // this.users = usersRequest;
    return users;
  }

  /* GET, REMOVE, SET */

  async salvarUser(key,usuario) {
    this.storage.set(key,usuario);
  }

  async getUser(key) {
    return this.storage.get(key);
  }  
}
