import Modules from "../model/module.class";
import Users from "../model/users.class";
import Books from "../model/books.class";

export default class Controller{
    constructor(){
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books()
        }
        this.view = new View();
    }

    async init(){
        await Promise.all([
            this.model.modules.populate(),
            this.model.users.populate(),
            this.model.books.populate()
        ]);
       

       this.view.renderModulesSelect(this.model.modules.data);
       this.view.render
    }
}