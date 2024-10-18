import User from './user.class.js';
import apiUsers from '../services/users.api.js';

export default class Users{
    constructor(){
        this.data = [];
    }

    populate(){
        const users = apiUsers.getDBUsers();
        this.data = users.map(user => new User(user.id, user.nick, user.email, user.password));
    }

    addUser(userData){
        let ultimoId = this.data.reduce((max, user) => user.id > max ? user.id : max, 0);
        ultimoId++;
        const usuario = new User(ultimoId, userData.nick, userData.email, userData.password);
        this.data.push(usuario);
        return usuario;
    }

    removeUser(id){
        const userIndex = this.data.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error('No se ha podido eliminar el usuario, compruebe que el id es correcto');
        } else {
            this.data = this.data.filter(user => user.id !== id);
        }
    }

    changeUser(user){
        const userIndex = this.data.findIndex(b => b.id === user.id);
        if (userIndex !== -1) {
            this.data[userIndex] = new User(user.id,user.nick,user.email,user.password);
            return this.data[userIndex];
        } else {
            throw new Error('No se ha podido modificar el user, compruebe que el id es correcto');
        }
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