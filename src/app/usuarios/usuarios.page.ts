import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario, Usuarios } from '../models/usuario.model';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  private index: number = 0;
  private readonly offset: number = 5;

  usersTotal: any;
  users: Usuarios;
  usuario: Usuario;
  constructor(public usuariosService: UsuariosService) { }

  async ngOnInit() {
    //   0 - 1       1 - 1    2-1      3-1        4-1
    /* usuario1, usuario2, usuario3, usuario4, usuario5 */

    let users = await this.usuariosService.getUsers();
    let usersFinal = [];
    for (let i=this.index;i<this.offset;i++) {
      usersFinal.push(users[i]);
    }
    this.usersTotal = users;
    this.users = usersFinal;
    this.index += this.offset;    
  }

  pegarDados(event) {
    console.log("aqui");
    setTimeout(() => {
      //let usersFinal = [];
      console.log(this.index);
      console.log(this.usersTotal);
      for (let i=this.index;i<(this.index+this.offset);i++) {
        this.users.push(this.usersTotal[i]);                
      }
      
      event.target.complete();
      if (this.index >= 9) {
        event.target.disabled = true;
      }
    }, 500);
  }

  async salvarUsuario() {
    let usuario: Usuario = {
              name: "Joaquim",
              username: "joca2011",
              id: 5,
              address: {
                street: '',               
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                    lat: 0,
                    lng: 0,
                }
              },
              company: {
                name: '',
                catchPhrase: '',
                bs: '',
              },
              email: '',
              phone: '',
              website: '',
    }
    console.log(usuario);
    await this.usuariosService.salvarUser(usuario.id.toString(),usuario);
  }

  async pegarUsuario() {
    this.usuario = await this.usuariosService.getUser("5");
  }

}
