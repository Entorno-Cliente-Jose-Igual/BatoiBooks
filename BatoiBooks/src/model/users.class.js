import User from './user.class.js';
import api from '../services/users.api.js';

export default class Users{
    constructor(){
        this.data = [];
    }

    async populate(){
        const users = await api.getDBUsers();
        this.data = users.map(user => new User(user.id, user.nick, user.email, user.password));
    }

    async addUser(userData){
        let ultimoId = this.data.reduce((max, user) => user.id > max ? user.id : max, 0);
        ultimoId++;
        const usuario = new User(ultimoId, userData.nick, userData.email, userData.password);
        this.data.push(usuario);
        return usuario;
    }

    async removeUser(id) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1) throw new Error("User not found");
    
        try{
          await api.removeDBUser(index)
        }catch(error){
          console.log(error)
        }
        this.data.splice(index, 1);
    }

    async changeUser(user) {
        user = new User(user.id, user.nick, user.email, user.password);
        const index = this.data.findIndex((item) => item.id === user.id);
        if (index === -1) throw new Error("User not found");
    
        try{
          await api.changeDBUser(user)
        }catch(error){
          console.log(error) 
        }
    
        this.data[index] = user;
        return user; 
      } 

    async changeUserPassword(id, password) {
        const datosNuevos = await api.changeDBUserPassword(id, password);
        const usuario = new User(datosNuevos.id, datosNuevos.nick, datosNuevos.email, datosNuevos.password);
        const index = this.data.findIndex((item) => item.id === usuario.id);
        if (index === -1) throw new Error("User not found");
        this.data[index] = usuario;
        return usuario;
    }

    getUserById(userId){
        let usuario = this.data.find(user => user.id === userId);
    
        if(usuario instanceof User){
            return usuario;
        }else{
            throw new Error('No se ha encontrado el usuario por su id');
        }
    }
    
    getUserIndexById(userId){
        let usuarioIndex = this.data.findIndex(user => user.id === userId);
    
        if(usuarioIndex != -1){
            return usuarioIndex;
        }else{
            throw new Error('No se ha encontrado el usuario por su id');
        }
    }
    
    getUserByNickName(nick){
        let usuarioNick = this.data.find(user => user.nick === nick);
    
        if(usuarioNick != null && usuarioNick != undefined){
            return usuarioNick;
        }else{
            throw new Error('No se ha encontrado el usuario por su nick');
        }
    }

    toString(){
        return this.data.map(user => user.toString()).join('\n');
    }
}